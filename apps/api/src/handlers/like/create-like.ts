import { prisma, Prisma } from "@repo/database";
import { handleExceptions } from "../../helpers/utils";
import { Request, Response } from "express";
import { z } from "zod";
import { CreateLikeRequest, CreateLikeResponse } from "./like";

const CreateLikeRequestSchema = z.discriminatedUnion("type", [
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

export const createLike = handleExceptions(
  async (
    req: Request<{}, {}, CreateLikeRequest>,
    res: Response<CreateLikeResponse>
  ) => {
    const parsedBody = CreateLikeRequestSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        status: "error",
        error: {
          root: ["Invalid request body"],
        },
      });
    }

    let data: {
      itemId: string;
      userId?: string;
      guestUserId?: string;
    } = { itemId: parsedBody.data.itemId };
    let where: Prisma.LikeWhereUniqueInput;
    if (parsedBody.data.type === "user") {
      where = {
        userId_itemId: {
          userId: parsedBody.data.userId,
          itemId: parsedBody.data.itemId,
        },
      };
      data = {
        ...data,
        userId: parsedBody.data.userId,
      };
    } else {
      where = {
        guestUserId_itemId: {
          guestUserId: parsedBody.data.guestUserId,
          itemId: parsedBody.data.itemId,
        },
      };
      data = {
        ...data,
        guestUserId: parsedBody.data.guestUserId,
      };
    }

    const existingLike = await prisma.like.findUnique({
      where,
    });

    if (existingLike) {
      await prisma.like.delete({
        where,
      });
    } else {
      await prisma.like.create({
        data,
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Like created successfully",
    });
  }
);
