import { z } from "zod";
import { handleExceptions } from "../../helpers/utils";
import { Request, Response } from "express";
import { ErrorResponse } from "./like";
import { Prisma } from "@prisma/client";
import prisma from "../../helpers/prisma";
import { ItemCardsI } from "../item/item";

const ReadLikesRequestSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("user"),
    userId: z.string(),
  }),
  z.object({
    type: z.literal("guest"),
    guestUserId: z.string(),
  }),
]);

export const readLikes = handleExceptions(
  async (req: Request, res: Response<ItemCardsI[] | ErrorResponse>) => {
    const parsedQuery = ReadLikesRequestSchema.safeParse(req.query);
    if (!parsedQuery.success) {
      return res.status(400).json({
        status: "error",
        error: {
          root: ["Invalid request query"],
        },
      });
    }

    const { type } = parsedQuery.data;
    let where: Prisma.LikeWhereInput;
    if (type === "user") {
      where = {
        userId: parsedQuery.data.userId,
      };
    } else {
      where = {
        guestUserId: parsedQuery.data.guestUserId,
      };
    }

    const likes = await prisma.like.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        item: {
          select: {
            id: true,
            name: true,
            latestPrice: true,
            brand: true,
            isSoldOut: true,
            images: {
              select: {
                url: true,
              },
            },
          },
        },
      },
    });

    const likedItems: ItemCardsI[] = likes.map((like) => ({
      id: like.item.id,
      name: like.item.name,
      image: like.item.images ? like.item.images[0]?.url : null,
      price: like.item.latestPrice,
      brand: {
        name: like.item.brand.name,
        label: like.item.brand.label,
        isPartneredBrand: like.item.brand.isPartnerBrand,
      },
      isSoldOut: like.item.isSoldOut,
    }));

    return res.status(200).json(likedItems);
  }
);
