import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const DeletItemViewsQuery = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("user"),
    userId: z.string(),
  }),
  z.object({
    type: z.literal("guest"),
    guestUserId: z.string(),
  }),
]);

export const deleteItemViews = handleExceptions(
  async (req: Request, res: Response) => {
    const parsedQuery = DeletItemViewsQuery.safeParse(req.query);
    if (!parsedQuery.success) {
      return res.status(400).json({
        status: "error",
        error: {
          root: ["Invalid query parameters"],
        },
      });
    }
    const { type } = parsedQuery.data;

    let where: Prisma.ItemViewWhereInput = {};
    if (type === "user") {
      const { userId } = parsedQuery.data;
      where = { userId };
    } else if (type === "guest") {
      const { guestUserId } = parsedQuery.data;
      where = { guestUserId };
    }

    await prisma.itemView.updateMany({
      where,
      data: {
        deletedAt: new Date(),
      },
    });

    return res.status(204).json();
  }
);
