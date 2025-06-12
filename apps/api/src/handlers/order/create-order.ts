import { Response, Request } from "express";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import {
  OrderStatus,
  ItemOrder,
  Order,
  Address,
  ShippingEstimate,
} from "@prisma/client";
import { z } from "zod";
import { getOrderConfirmationHtml } from "../../helpers/html-emails";
import {
  CreateOrderRequest,
  CreateOrderResponse,
  CreateOrderSuccessResponse,
} from "./order";
import { Resend } from "resend";

const baseOrderSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  shippingEstimates: z.array(
    z.object({
      cost: z.number(),
      brand: z.string(),
    })
  ),
  itemOrders: z.array(
    z.object({
      itemId: z.string(),
      quantity: z.number(),
      name: z.string(),
      image: z.string(),
      price: z.number(),
      sizeId: z.string(),
      colorId: z.string().nullable(),
    })
  ),
});

const createOrderSchema = z.discriminatedUnion("isSavedAddress", [
  baseOrderSchema.extend({
    isSavedAddress: z.literal(true),
    addressId: z.string(),
  }),
  baseOrderSchema.extend({
    isSavedAddress: z.literal(false),
    address: z.object({
      firstName: z.string(),
      lastName: z.string(),
      address: z.string(),
      apartment: z.string().nullable(),
      city: z.string(),
      governorate: z.string(),
      postalCode: z.string().nullable(),
    }),
  }),
]);

export const createOrder = handleExceptions(
  async (req: Request, res: Response<CreateOrderResponse>) => {
    const result = createOrderSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        status: "error",
        error: {
          root: ["Validation failed"],
        },
      });
    }

    const orderData: CreateOrderRequest = result.data;

    try {
      const user = await prisma.user.findUnique({
        where: { id: orderData.userId },
      });
      if (!user) {
        return res.status(400).json({
          status: "error",
          error: {
            root: ["User not found, please sign in or create an account"],
          },
        });
      }

      const result = await prisma.$transaction(async (tx) => {
        let addressId: string;
        if (!orderData.isSavedAddress) {
          const address = await tx.address.create({
            data: {
              firstName: orderData.address.firstName,
              lastName: orderData.address.lastName,
              company: null,
              address: orderData.address.address,
              apartment: orderData.address.apartment ?? null,
              city: orderData.address.city,
              governorate: orderData.address.governorate,
              country: "EGY",
              postalCode: orderData.address.postalCode ?? null,
              userId: orderData.userId,
            },
          });
          addressId = address.id;
        } else {
          addressId = orderData.addressId;
        }

        const itemsTotal = orderData.itemOrders.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const shippingTotal = orderData.shippingEstimates.reduce(
          (sum, estimate) => sum + estimate.cost,
          0
        );
        const orderTotal = itemsTotal + shippingTotal;

        let orderNumber = generateOrderNumber();
        let orderExists = await tx.order.findUnique({
          where: { orderNumber },
        });
        while (orderExists) {
          orderNumber = generateOrderNumber();
          orderExists = await tx.order.findUnique({
            where: { orderNumber },
          });
        }

        const order = await tx.order.create({
          data: {
            orderNumber,
            orderTotal,
            status: OrderStatus.PENDING,
            userId: user.id,
            email: orderData.email,
            phoneNumber: orderData.phoneNumber,
            addressId,
          },
        });

        const shippingEstimates = await Promise.all(
          orderData.shippingEstimates.map(async (estimate) => {
            const brand = await tx.brand.findUnique({
              where: { name: estimate.brand },
            });
            return tx.shippingEstimate.create({
              data: {
                cost: estimate.cost,
                brandId: brand?.id ?? "",
                orderId: order.id,
              },
            });
          })
        );

        // item orders
        const itemOrders = await Promise.all(
          orderData.itemOrders.map(async (item, index) => {
            const DatabaseItem = await tx.item.findUnique({
              where: { id: item.itemId },
            });
            const itemBrandId = DatabaseItem?.brandId;

            const shippingEstimate =
              shippingEstimates.find((estimate) => {
                return estimate.brandId === itemBrandId;
              }) ?? shippingEstimates[0];

            return tx.itemOrder.create({
              data: {
                orderId: order.id,
                shippingEstimateId: shippingEstimate.id,
                itemId: item.itemId,
                quantity: item.quantity,
                name: item.name,
                image: item.image,
                price: item.price,
                sizeId: item.sizeId,
                colorId: item.colorId || undefined,
              },
            });
          })
        );

        // delete itemCart
        await tx.itemCart.deleteMany({
          where: {
            userId: user.id,
          },
        });

        const address = await tx.address.findUnique({
          where: { id: addressId },
        });

        return {
          order,
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
          },
          address,
          itemOrders,
          shippingEstimates,
        };
      });

      await sendOrderConfirmationEmail(result);

      return res.status(201).json({
        status: "success",
        message: "Order created successfully",
        data: {
          orderId: result.order.id,
          orderNumber: result.order.orderNumber,
          orderTotal: result.order.orderTotal,
          status: result.order.status,
          user: result.user,
          items: result.itemOrders,
          shippingAddress: result.address,
          shippingEstimates: result.shippingEstimates,
        } as CreateOrderSuccessResponse["data"],
      });
    } catch (error) {
      console.error("Error creating order:", error);

      if (error instanceof Error) {
        if (error.message.includes("Unique constraint")) {
          return res.status(409).json({
            status: "error",
            error: {
              root: ["A record with this information already exists"],
            },
          });
        }
      }

      return res.status(500).json({
        status: "error",
        error: {
          root: ["Failed to create order but why man"],
        },
      });
    }
  }
);

async function sendOrderConfirmationEmail(result: {
  order: Order;
  user: {
    id: string;
    email: string;
    username: string;
  };
  address: Address | null;
  itemOrders: ItemOrder[];
  shippingEstimates: ShippingEstimate[];
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const html = getOrderConfirmationHtml({
    name: result.address?.firstName ?? "Loomer",
    orderNumber: result.order.orderNumber,
    items: result.itemOrders,
    total: result.order.orderTotal,
    shippingAddress: result.address?.address ?? "Loomer",
    estimatedDelivery: "2025-05-25",
  });
  await resend.emails.send({
    from: "Loom Cairo <orders@loomcairo.com>",
    to: result.order.email,
    subject: "Order Confirmation",
    html,
  });
}

function generateOrderNumber(): string {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `LOOM-${randomNum}`;
}
