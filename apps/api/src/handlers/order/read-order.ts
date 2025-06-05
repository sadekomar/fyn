import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { Order } from "@prisma/client";

export const readOrder = handleExceptions(
  async (req: Request, res: Response): Promise<Response<Order>> => {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    return res.status(200).json(order);
  }
);
