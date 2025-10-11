import { z } from "zod";
import { handleExceptions } from "../../helpers/utils";
import { Prisma } from "@prisma/client";
import prisma from "../../helpers/prisma";
import { Request, Response } from "express";
import { ErrorResponse, ReadLikeResponse } from "./like";

const ReadLikeRequestSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("user"),
    itemId: z.string(),
    userId: z.string(),
  }),
  z.object({
    type: z.literal("guest"),
    itemId: z.string(),
    guestUserId: z.string(),
  }),
]);

export const readLike = handleExceptions(
  async (req: Request, res: Response<ReadLikeResponse | ErrorResponse>) => {
    const parsedQuery = ReadLikeRequestSchema.safeParse(req.query);
    if (!parsedQuery.success) {
      return res.status(400).json({
        status: "error",
        error: {
          root: ["Invalid request query"],
        },
      });
    }

    const { type } = parsedQuery.data;
    let where: Prisma.LikeWhereUniqueInput;
    if (type === "user") {
      where = {
        userId_itemId: {
          userId: parsedQuery.data.userId,
          itemId: parsedQuery.data.itemId,
        },
      };
    } else {
      where = {
        guestUserId_itemId: {
          guestUserId: parsedQuery.data.guestUserId,
          itemId: parsedQuery.data.itemId,
        },
      };
    }

    const like = await prisma.like.findUnique({
      where,
    });

    if (!like) {
      return res.status(200).json({ isLiked: false });
    }

    return res.status(200).json({ isLiked: true });
  }
);
