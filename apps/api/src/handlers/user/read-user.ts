import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { ReadUserCheckoutResponse, ReadUserFullResponse } from "./user";

export const readUser = handleExceptions(
  async (req: Request, res: Response<ReadUserFullResponse | null>) => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        itemViews: true,
        categoryViews: true,
        brandViews: true,
        likes: true,
        itemCarts: true,
        orders: true,
        addresses: true,
      },
    });

    if (!user) {
      return res.status(404).json(null);
    }

    const response: ReadUserFullResponse = user;

    return res.status(200).json(response);
  }
);

export const readUserCheckout = handleExceptions(
  async (req: Request, res: Response<ReadUserCheckoutResponse | null>) => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        addresses: true,
      },
    });

    if (!user) {
      return res.status(404).json(null);
    }

    const response: ReadUserCheckoutResponse = user;

    return res.status(200).json(response);
  }
);
