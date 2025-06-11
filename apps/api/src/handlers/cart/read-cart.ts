import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { CartItem } from "./cart";

export const readCartItems = handleExceptions(
  async (
    req: Request,
    res: Response<CartItem[] | { status: "error"; error: { userId: string[] } }>
  ) => {
    const { userId } = req.params;
    console.log("");

    if (!userId) {
      return res.status(400).json({
        status: "error",
        error: {
          userId: ["User ID is required"],
        },
      });
    }

    const cartItems = await prisma.itemCart.findMany({
      select: {
        id: true,
        itemId: true,
        quantity: true,
        size: {
          select: {
            id: true,
            name: true,
          },
        },
        color: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
      },
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedCartItems: CartItem[] = cartItems.map((cartItem) => ({
      id: cartItem.id,
      itemId: cartItem.itemId,
      quantity: cartItem.quantity,
      size: cartItem.size,
      color: cartItem.color,
      createdAt: cartItem.createdAt,
    }));

    return res.status(200).json(formattedCartItems);
  }
);
