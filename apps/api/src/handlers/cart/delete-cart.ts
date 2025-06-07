import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { Request, Response } from "express";
import { DeleteCartResponse } from "./cart";

export const deleteCartItem = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<DeleteCartResponse>> => {
    const { id } = req.params;

    const cartItem = await prisma.itemCart.delete({
      where: { id },
    });

    return res.status(200).json(cartItem);
  }
);
