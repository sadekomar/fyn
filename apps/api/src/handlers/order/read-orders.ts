import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { Order } from "@prisma/client";

export const readOrders = handleExceptions(
  async (req: Request, res: Response): Promise<Response<Order[]>> => {
    const { userId } = req.params;

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
      },
    });

    return res.status(200).json(orders);
  }
);
