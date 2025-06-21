import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { ReadOrderResponse } from "./order";

export const readOrder = handleExceptions(
  async (
    req: Request,
    res: Response<
      ReadOrderResponse | { status: "error"; error: { id: string[] } }
    >
  ) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: "error",
        error: {
          id: ["Order ID is required"],
        },
      });
    }

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            size: true,
            color: true,
            shippingEstimate: {
              include: {
                brand: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        status: "error",
        error: {
          id: ["Order not found"],
        },
      });
    }

    return res.status(200).json(order);
  }
);

export const readOrderByNumber = handleExceptions(
  async (req: Request, res: Response<ReadOrderResponse | null>) => {
    const { orderNumber } = req.params;

    if (!orderNumber) {
      return res.status(400).json(null);
    }

    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: {
          include: {
            size: true,
            color: true,
            shippingEstimate: {
              include: {
                brand: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json(null);
    }

    return res.status(200).json(order);
  }
);
