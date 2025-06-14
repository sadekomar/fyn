import { Request, Response } from "express";

import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { CreateItemViewRequest, CreateItemViewResponse } from "./item-view";

export const createItemView = handleExceptions(
  async (
    req: Request<{}, {}, CreateItemViewRequest>,
    res: Response<CreateItemViewResponse>
  ) => {
    const { itemId, userId } = req.body;

    const existingItemView = await prisma.itemView.findFirst({
      where: {
        AND: [
          {
            itemId: itemId,
          },
          {
            userId: userId,
          },
        ],
      },
    });

    if (existingItemView) {
      await prisma.itemView.update({
        where: {
          id: existingItemView.id,
        },
        data: {
          quantity: existingItemView.quantity + 1,
        },
      });

      return res.status(200).json({
        status: "success",
        message: "Item view updated",
      });
    } else {
      await prisma.itemView.create({
        data: {
          itemId,
          userId,
        },
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Item view created",
    });
  }
);
