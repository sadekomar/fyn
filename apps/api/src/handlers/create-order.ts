// okay when an order is created what do i wanna do
import { Response, Request } from "express";
import { handleExceptions } from "../helpers/utils";
import prisma from "../helpers/prisma";
import { OrderStatus, Item } from "@prisma/client";
import { z } from "zod";

// i want to get the data for order creation
// add it to the database
// also use that data to create a user account

const createOrderSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
  itemsIds: z.array(z.string()),
});

// what would the api schema look like
/**
 * {
 *  address
 * }
 *  */

export const createOrder = handleExceptions(
  async (req: Request, res: Response) => {
    // const itemOrder = prisma.itemOrder.createMany({
    //   data: {
    //     itemId: getItemsByIds,
    //     orderId: orderId,
    //     quantity: quantity,
    //     name: name,
    //     image: image,
    //     price: price,
    //     sizeId: sizeId,
    //     colorId: colorId,
    //     shippingEstimateId: shippingEstimateId,
    //   },
    // });

    // const data = prisma.order.create({
    //   data: {
    //     email,
    //     orderNumber,
    //     orderTotal,
    //     phoneNumber,
    //     address,
    //     addressId,
    //     createdAt,
    //     items,
    //     updatedAt,
    //     user,
    //     status: OrderStatus.PENDING,
    //   },
    // });
    return res.status(200).send("ok");
  }
);
