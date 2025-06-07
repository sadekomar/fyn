import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { Request, Response } from "express";
import { UpdateCartResponse } from "./cart";

export const updateCartItem = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<UpdateCartResponse>> => {
    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await prisma.itemCart.update({
      where: { id },
      data: { quantity },
    });

    const response: UpdateCartResponse = {
      status: "success",
      message: "Cart item updated successfully",
      data: {
        id: cartItem.id,
        quantity: cartItem.quantity,
      },
    };

    return res.status(200).json(response);
  }
);
