import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import { prisma, Order } from "@repo/database";

export const deleteOrder = handleExceptions(
  async (req: Request, res: Response): Promise<Response<Order>> => {
    const { id } = req.params;

    const order = await prisma.order.delete({
      where: { id },
    });

    return res.status(200).json(order);
  }
);
