import { Response, Request } from "express";
import { handleExceptions } from "../helpers/utils";
import prisma from "../helpers/prisma";
import { OrderStatus, Item, ItemOrder } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";
import {
  getEmailConfirmationHtml,
  getOrderConfirmationHtml,
} from "../helpers/html-emails";
// import { Resend } from "resend";

type ShippingEstimate = {
  brand: string;
  cost: number;
  itemIds: string[];
};

type Address = {
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  governorate: string;
  postalCode: string;
};

type OrderItem = {
  itemId: string;
  quantity: number;
  name: string;
  image: string;
  price: number;
  sizeId: string;
  colorId: string;
};

export type OrderData = {
  email: string;
  phoneNumber: string;
  password: string;
  address: Address;
  billingAddress: Partial<Address> | null;
  shippingEstimates: ShippingEstimate[];
  items: OrderItem[];
  paymentMethod: string;
};

const createOrderSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  address: z.object({
    country: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    apartment: z.string().optional(),
    city: z.string(),
    governorate: z.string(),
    postalCode: z.string(),
  }),
  billingAddress: z
    .object({
      country: z.string().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      address: z.string().optional(),
      apartment: z.string().optional(),
      city: z.string().optional(),
      governorate: z.string().optional(),
      postalCode: z.string().optional(),
    })
    .nullable(),
  shippingEstimates: z.array(
    z.object({
      brand: z.string(),
      cost: z.number(),
      itemIds: z.array(z.string()),
    })
  ),
  items: z.array(
    z.object({
      itemId: z.string(),
      quantity: z.number(),
      name: z.string(),
      image: z.string(),
      price: z.number(),
      sizeId: z.string(),
      colorId: z.string(),
    })
  ),
  paymentMethod: z.string(),
});

function generateOrderNumber(): string {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `LOOM-${randomNum}`;
}

function generateUsername(email: string): string {
  const baseUsername = email.split("@")[0];
  const randomSuffix = Math.random().toString(36).substring(2, 6);
  return `${baseUsername}_${randomSuffix}`;
}

type OrderSuccessResponse = {
  status: "success";
  message: string;
  data: {
    orderId: string;
    orderNumber: string;
    orderTotal: number;
    status: OrderStatus;
    user: {
      id: string;
      email: string;
      username: string;
    };
    items: ItemOrder[];
    shippingAddress: Address;
  };
};

type OrderErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type OrderResponse = OrderSuccessResponse | OrderErrorResponse;

export const createOrder = handleExceptions(
  async (req: Request, res: Response): Promise<Response<OrderResponse>> => {
    const validationResult = createOrderSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: validationResult.error.errors,
      });
    }

    const orderData: OrderData = validationResult.data;

    try {
      // Start a transaction to ensure data consistency
      const result = await prisma.$transaction(async (tx) => {
        // 1. Check if user exists, if not create one
        let user = await tx.user.findUnique({
          where: { email: orderData.email },
        });
        if (!user) {
          const hashedPassword = await bcrypt.hash(orderData.password, 10);

          let username = generateUsername(orderData.email);
          let usernameExists = await tx.user.findUnique({
            where: { username },
          });
          while (usernameExists) {
            username = generateUsername(orderData.email);
            usernameExists = await tx.user.findUnique({
              where: { username },
            });
          }

          const token = crypto.randomUUID();
          const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

          user = await tx.user.create({
            data: {
              email: orderData.email,
              password: hashedPassword,
              username: username,
              firstName: orderData.address.firstName,
              lastName: orderData.address.lastName,
              phoneNumber: orderData.phoneNumber,
              confirmationToken: token,
              tokenExpiresAt: expires,
            },
          });
          // send verification email
          const html = getEmailConfirmationHtml(
            orderData.address.firstName ?? "Loomer",
            token
          );

          // const resend = new Resend(process.env.RESEND_API_KEY);
          // await resend.emails.send({
          //   from: "Loom Cairo <orders@loomcairo.com>",
          //   to: orderData.email,
          //   subject: "Confirm your email",
          //   html,
          // });
        } else {
          // check if user's password matches the one provided
          const passwordMatches = await bcrypt.compare(
            orderData.password,
            user.password
          );
          if (!passwordMatches) {
            throw new Error("Invalid password");
          }
        }

        // 2. Create shipping address
        const shippingAddress = await tx.address.create({
          data: {
            firstName: orderData.address.firstName,
            lastName: orderData.address.lastName,
            company: null,
            address: orderData.address.address,
            apartment: orderData.address.apartment ?? null,
            city: orderData.address.city,
            governorate: orderData.address.governorate,
            country: orderData.address.country,
            postalCode: orderData.address.postalCode ?? null,
            userId: user.id,
          },
        });

        // 3. Create shipping estimates
        const shippingEstimateRecords = await Promise.all(
          orderData.shippingEstimates.map(async (estimate) => {
            const brand = await tx.brand.findUnique({
              where: { id: estimate.brand },
            });
            return tx.shippingEstimate.create({
              data: {
                cost: estimate.cost,
                brandId: brand?.id ?? "",
              },
            });
          })
        );

        // 4. Calculate total order amount (items + shipping)
        const itemsTotal = orderData.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const shippingTotal = orderData.shippingEstimates.reduce(
          (sum, estimate) => sum + estimate.cost,
          0
        );
        const orderTotal = itemsTotal + shippingTotal;

        // 5. Generate unique order number
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

        // 6. Create the order
        const order = await tx.order.create({
          data: {
            orderNumber,
            orderTotal,
            status: OrderStatus.PENDING,
            userId: user.id,
            email: orderData.email,
            phoneNumber: orderData.phoneNumber,
            addressId: shippingAddress.id,
          },
        });

        // 7. Create item orders
        const itemOrders = await Promise.all(
          orderData.items.map((item, index) => {
            // Find the shipping estimate for this item
            const shippingEstimate =
              shippingEstimateRecords.find((_, estimateIndex) => {
                const originalEstimate =
                  orderData.shippingEstimates[estimateIndex];
                return originalEstimate.itemIds.includes(item.itemId);
              }) || shippingEstimateRecords[0]; // Fallback to first estimate if not found

            return tx.itemOrder.create({
              data: {
                orderId: order.id,
                itemId: item.itemId,
                quantity: item.quantity,
                name: item.name,
                image: item.image,
                price: item.price,
                sizeId: item.sizeId,
                colorId: item.colorId || undefined,
                shippingEstimateId: shippingEstimate.id,
              },
            });
          })
        );

        const html = getOrderConfirmationHtml({
          name: orderData.address.firstName ?? "Loomer",
          orderNumber: order.orderNumber,
          items: orderData.items,
          total: orderTotal,
          shippingAddress: shippingAddress.address,
          estimatedDelivery: "2025-05-25",
        });

        // const resend = new Resend(process.env.RESEND_API_KEY);
        // await resend.emails.send({
        //   from: "Loom Cairo <orders@loomcairo.com>",
        //   to: orderData.email,
        //   subject: "Order Confirmation",
        //   html,
        // });

        return {
          order,
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
          },
          shippingAddress,
          itemOrders,
          shippingEstimateRecords,
        };
      });

      console.log(result);
      console.log(result.order);
      // Return success response
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
          shippingAddress: result.shippingAddress,
          shippingEstimates: result.shippingEstimateRecords,
        } as OrderSuccessResponse["data"],
      });
    } catch (error) {
      console.error("Error creating order:", error);

      // Handle specific database errors
      if (error instanceof Error) {
        if (error.message.includes("Unique constraint")) {
          return res.status(409).json({
            status: "error",
            error: {
              root: "A record with this information already exists",
            },
          });
        }
      }

      return res.status(500).json({
        status: "error",
        error: {
          root: "Failed to create order but why man",
        },
      });
    }
  }
);
