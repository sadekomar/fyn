import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { ReadAllOrdersResponse } from "./order";

export const readOrders = handleExceptions(
  async (
    req: Request,
    res: Response<
      ReadAllOrdersResponse[] | { status: "error"; error: { userId: string[] } }
    >
  ) => {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        status: "error",
        error: {
          userId: ["User ID is required"],
        },
      });
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            size: true,
            color: true,
            shippingEstimate: true,
          },
        },
        address: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(orders);
  }
);
