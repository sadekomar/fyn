import { Response, Request } from "express";
import { handleExceptions, isDevelopment } from "../../helpers/utils";
import {
  prisma,
  OrderStatus,
  ItemOrder,
  Order,
  Address,
  ShippingEstimate,
  AddressType,
} from "@repo/database";
import { z } from "zod";
import {
  getOrderConfirmationHtml,
  OrderConfirmationEmail,
} from "../../helpers/order-confirmation-email";
import {
  CreateOrderRequest,
  CreateOrderResponse,
  CreateOrderSuccessResponse,
} from "./order";
import { Resend } from "resend";
// hnttn again
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
            isSavedForLater: false,
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
  const items = await prisma.item.findMany({
    where: {
      id: { in: result.itemOrders.map((item) => item.itemId) },
    },
    include: {
      brand: true,
      sizes: true,
    },
  });

  const brands = await prisma.brand.findMany({
    where: {
      id: { in: result.shippingEstimates.map((estimate) => estimate.brandId) },
    },
  });

  const order: OrderConfirmationEmail = {
    orderNumber: result.order.orderNumber,
    orderTotal: result.order.orderTotal,
    items: result.itemOrders.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      brand: items.find((i) => i.id === item.itemId)?.brand.name ?? "",
      price: item.price,
      size:
        items
          .find((i) => i.id === item.itemId)
          ?.sizes.find((s) => s.id === item.sizeId)?.name ?? "",
      image: item.image.replaceAll("loom-image-dimensions", "360") ?? "",
    })),
    shippingEstimates: result.shippingEstimates.map((estimate) => ({
      cost: estimate.cost,
      brand: {
        id: estimate.brandId,
        name: brands.find((b) => b.id === estimate.brandId)?.name ?? "",
      },
    })),
    status: result.order.status as OrderStatus,
    address: {
      addressType: result.address?.addressType ?? AddressType.NORMAL,
      firstName: result.address?.firstName ?? "",
      lastName: result.address?.lastName ?? "",
      address: result.address?.address ?? "",
      apartment: result.address?.apartment ?? "",
      city: result.address?.city ?? "",
      governorate: result.address?.governorate ?? "",
      country: result.address?.country ?? "",
      postalCode: result.address?.postalCode ?? "",
      company: result.address?.company ?? "",
      createdAt: result.address?.createdAt ?? new Date(),
    },
  };

  const html = getOrderConfirmationHtml(order);

  if (!isDevelopment()) {
    await resend.emails.send({
      from: "Loom Cairo <orders@loomcairo.com>",
      to: [result.order.email, "contact@loomcairo.com"],
      subject: "Order Confirmation",
      html,
    });
  } else {
    console.log(
      `[DEV] Order confirmation email would be sent to ${result.order.email} for order ${result.order.orderNumber}`
    );
  }
}

function generateOrderNumber(): string {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `LOOM-${randomNum}`;
}
