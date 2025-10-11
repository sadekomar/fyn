import { Request, Response } from "express";

import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { CreateItemViewRequest, CreateItemViewResponse } from "./item-view";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const CreateItemViewRequestBody = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("guest"),
    guestUserId: z.string(),
    itemId: z.string(),
  }),
  z.object({
    type: z.literal("user"),
    userId: z.string(),
    itemId: z.string(),
  }),
]);

export const createItemView = handleExceptions(
  async (
    req: Request<{}, {}, CreateItemViewRequest>,
    res: Response<
      CreateItemViewResponse | { status: "error"; error: { root: string[] } }
    >
  ) => {
    const parsedBody = CreateItemViewRequestBody.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({
        status: "error",
        error: {
          root: ["Invalid query parameters"],
        },
      });
    }

    const { type } = parsedBody.data;
    let data: {
      itemId: string;
      userId?: string;
      guestUserId?: string;
    } = { itemId: parsedBody.data.itemId };
    let where: Prisma.ItemViewWhereInput = {};
    if (type === "guest") {
      where = {
        AND: [
          { itemId: parsedBody.data.itemId },
          { guestUserId: parsedBody.data.guestUserId },
        ],
      };
      data = {
        ...data,
        guestUserId: parsedBody.data.guestUserId,
      };
    } else {
      where = {
        AND: [
          { itemId: parsedBody.data.itemId },
          { userId: parsedBody.data.userId },
        ],
      };
      data = {
        ...data,
        userId: parsedBody.data.userId,
      };
    }

    const existingItemView = await prisma.itemView.findFirst({
      where,
    });

    if (existingItemView) {
      if (existingItemView.deletedAt) {
        await prisma.itemView.update({
          where: { id: existingItemView.id },
          data: { quantity: 1, deletedAt: null },
        });
      } else {
        await prisma.itemView.update({
          where: { id: existingItemView.id },
          data: { quantity: existingItemView.quantity + 1 },
        });
      }
    } else {
      await prisma.itemView.create({
        data,
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Item view created",
    });
  }
);
