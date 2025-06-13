import prisma from "../../helpers/prisma";
import { handleExceptions } from "../../helpers/utils";
import { Request, Response } from "express";
import { CreateCartResponse } from "./cart";

export const createCartItem = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<CreateCartResponse>> => {
    const { itemId, sizeId, colorId, quantity, userId } = req.body;

    // oh my god this was a crazy problem.
    // i would add an item to another user's cart because i wasn't checking the userId
    const existingCartItem = await prisma.itemCart.findFirst({
      where: {
        itemId: req.body.itemId,
        sizeId: req.body.sizeId,
        colorId: req.body.colorId,
        userId: req.body.userId,
      },
    });

    if (existingCartItem) {
      await prisma.itemCart.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + req.body.quantity },
      });

      return res.status(200).json(existingCartItem);
    }

    const cartItem = await prisma.itemCart.create({
      data: { ...req.body },
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
