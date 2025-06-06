import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { ItemCart } from "@prisma/client";
import { ItemCardsI } from "../item/item-types";

type CartRequest = {
  itemId: string;
  sizeId: string;
  colorId: string;
  quantity: number;
  userId: string;
};

export const createCartItem = handleExceptions(
  async (
    req: Request<{}, {}, CartRequest>,
    res: Response
  ): Promise<Response<ItemCart>> => {
    const existingCartItem = await prisma.itemCart.findFirst({
      where: {
        itemId: req.body.itemId,
        sizeId: req.body.sizeId,
        colorId: req.body.colorId,
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

    return res.status(201).json(cartItem);
  }
);

type CartItem = {
  id: string;
  itemId: string;
  quantity: number;
  size: {
    id: string;
    name: string;
  };
  color: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
};

export const readCartItems = handleExceptions(
  async (req: Request, res: Response): Promise<Response<CartItem[]>> => {
    const { userId } = req.params;

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

export const updateCartItem = handleExceptions(
  async (req: Request, res: Response): Promise<Response<ItemCart>> => {
    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await prisma.itemCart.update({
      where: { id },
      data: { quantity },
    });

    return res.status(200).json(cartItem);
  }
);

export const deleteCartItem = handleExceptions(
  async (req: Request, res: Response): Promise<Response<ItemCart>> => {
    const { id } = req.params;

    const cartItem = await prisma.itemCart.delete({
      where: { id },
    });

    return res.status(200).json(cartItem);
  }
);
