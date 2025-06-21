import prisma from "../../helpers/prisma";
import { handleExceptions } from "../../helpers/utils";
import { Request, Response } from "express";
import { CreateCartResponse } from "./cart";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const CreateItemCartBase = z.object({
  itemId: z.string(),
  sizeId: z.string(),
  colorId: z.string().optional().nullable(),
  quantity: z.number(),
});

const CreateItemCartRequestBody = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("user"),
    userId: z.string(),
    ...CreateItemCartBase.shape,
  }),
  z.object({
    type: z.literal("guest"),
    guestUserId: z.string(),
    ...CreateItemCartBase.shape,
  }),
]);

type CreateCartRequest = z.infer<typeof CreateItemCartRequestBody>;

export const createCartItem = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<CreateCartResponse>> => {
    const parsedBody = CreateItemCartRequestBody.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({
        status: "error",
        error: {
          root: ["Invalid request body"],
        },
      });
    }

    const { type } = parsedBody.data;
    let where: Prisma.ItemCartWhereInput = {
      itemId: parsedBody.data.itemId,
      sizeId: parsedBody.data.sizeId,
      colorId: parsedBody.data.colorId,
    };
    let data: {
      itemId: string;
      sizeId: string;
      colorId?: string | null;
      quantity: number;
      userId?: string;
      guestUserId?: string;
    } = {
      itemId: parsedBody.data.itemId,
      sizeId: parsedBody.data.sizeId,
      colorId: parsedBody.data.colorId ?? null,
      quantity: parsedBody.data.quantity,
    };

    if (type === "user") {
      where = {
        ...where,
        userId: parsedBody.data.userId,
      };
      data = {
        ...data,
        userId: parsedBody.data.userId,
      };
    } else {
      where = {
        ...where,
        guestUserId: parsedBody.data.guestUserId,
      };
      data = {
        ...data,
        guestUserId: parsedBody.data.guestUserId,
      };
    }

    // oh my god this was a crazy problem.
    // i would add an item to another user's cart because i wasn't checking the userId
    const existingCartItem = await prisma.itemCart.findFirst({
      where,
    });

    if (existingCartItem) {
      await prisma.itemCart.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: existingCartItem.quantity + parsedBody.data.quantity,
        },
      });

      return res.status(200).json(existingCartItem);
    }

    const cartItem = await prisma.itemCart.create({
      data,
    });

    const response: CreateCartResponse = {
      status: "success",
      message: "Cart item created successfully",
      data: {
        id: cartItem.id,
        quantity: cartItem.quantity,
      },
    };
    return res.status(201).json(response);
  }
);
