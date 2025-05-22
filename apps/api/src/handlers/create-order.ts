import { Request, Response } from "express";
import { handleExceptions } from "../helpers/utils";
import prisma from "../helpers/prisma";
import { z } from "zod";
import { Resend } from "resend";
import { getOrderConfirmationHtml } from "../helpers/html-emails";

interface AuthenticatedRequest extends Request {
  userId: string;
}

const CreateOrderSchema = z.object({
  addressId: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  items: z.array(
    z.object({
      itemId: z.string(),
      quantity: z.number().int().positive(),
      sizeId: z.string(),
      colorId: z.string().optional(),
      shippingEstimateId: z.string(),
    })
  ),
});

type CreateOrderRequest = z.infer<typeof CreateOrderSchema>;

export const createOrder = handleExceptions(
  async (req: Request, res: Response) => {
    const parsedBody = CreateOrderSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        error: "Invalid request body",
        details: parsedBody.error.format(),
      });
    }

    const { addressId, email, phoneNumber, items } = parsedBody.data;

    // Generate unique order number (timestamp + random string)
    const orderNumber = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;

    // Start transaction
    const order = await prisma.$transaction(async (tx) => {
      // 1. Get address details for email
      const address = await tx.address.findUnique({
        where: { id: addressId },
        select: {
          firstName: true,
          lastName: true,
          address: true,
          apartment: true,
          city: true,
          governorate: true,
          country: true,
        },
      });

      if (!address) {
        throw new Error(`Address not found: ${addressId}`);
      }

      // 2. Create the order
      const order = await tx.order.create({
        data: {
          orderNumber,
          userId: req.userId,
          addressId,
          email,
          phoneNumber,
          orderTotal: 0, // Will update this after calculating total
          items: {
            create: await Promise.all(
              items.map(async (item) => {
                const itemData = await tx.item.findUnique({
                  where: { id: item.itemId },
                  select: {
                    name: true,
                    latestPrice: true,
                    images: true,
                  },
                });

                if (!itemData) {
                  throw new Error(`Item not found: ${item.itemId}`);
                }

                const shippingEstimate = await tx.shippingEstimate.findUnique({
                  where: { id: item.shippingEstimateId },
                  select: { cost: true },
                });

                if (!shippingEstimate) {
                  throw new Error(
                    `Shipping estimate not found: ${item.shippingEstimateId}`
                  );
                }

                const size = await tx.size.findUnique({
                  where: { id: item.sizeId },
                  select: { name: true },
                });

                if (!size) {
                  throw new Error(`Size not found: ${item.sizeId}`);
                }

                return {
                  itemId: item.itemId,
                  quantity: item.quantity,
                  sizeId: item.sizeId,
                  colorId: item.colorId,
                  shippingEstimateId: item.shippingEstimateId,
                  name: itemData.name,
                  price: itemData.latestPrice,
                  image: itemData.images[0]?.url || "",
                };
              })
            ),
          },
        },
        include: {
          items: {
            include: {
              shippingEstimate: true,
              size: true,
            },
          },
        },
      });

      // 3. Calculate total (items + shipping)
      const orderTotal = order.items.reduce((total, item) => {
        return total + item.price * item.quantity + item.shippingEstimate.cost;
      }, 0);

      // 4. Update order with total
      const updatedOrder = await tx.order.update({
        where: { id: order.id },
        data: { orderTotal },
        include: {
          items: {
            include: {
              item: {
                select: {
                  name: true,
                  brand: {
                    select: { name: true },
                  },
                },
              },
              size: true,
              color: true,
              shippingEstimate: true,
            },
          },
          address: true,
        },
      });

      // 5. Clear user's cart
      await tx.itemCart.deleteMany({
        where: { userId: req.userId },
      });

      // 6. Send confirmation email
      const resend = new Resend(process.env.RESEND_API_KEY);
      const formattedAddress = `${address.address}${address.apartment ? `, ${address.apartment}` : ""}, ${address.city}, ${address.governorate}, ${address.country}`;

      const emailHtml = getOrderConfirmationHtml({
        name: address.firstName,
        orderNumber: order.orderNumber,
        items: order.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          size: item.size.name,
        })),
        total: orderTotal,
        shippingAddress: formattedAddress,
        estimatedDelivery: "2-3 business days",
      });

      await resend.emails.send({
        from: "Loom Cairo <orders@orders.loomcairo.com>",
        to: email,
        subject: `Loom - Order Confirmation #${order.orderNumber}`,
        html: emailHtml,
      });

      return updatedOrder;
    });

    return res.status(201).json(order);
  }
);
