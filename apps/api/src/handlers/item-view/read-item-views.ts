import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { ItemCardsI } from "../item/item";
import { Prisma } from "@prisma/client";

export const readUserItemViews = handleExceptions(
  async (req: Request, res: Response<ItemCardsI[]>) => {
    const { type } = req.query;

    let where: Prisma.ItemViewWhereInput = {};
    if (!type || (type !== "user" && type !== "guest")) {
      return res.status(400).json([]);
    }

    if (type === "user") {
      const { userId } = req.query;
      if (!userId) return res.status(400).json([]);
      where = { userId: userId as string };
    } else if (type === "guest") {
      const { guestUserId } = req.query;
      if (!guestUserId) return res.status(400).json([]);
      where = { guestUserId: guestUserId as string };
    }

    const itemViews = await prisma.itemView.findMany({
      take: 30,
      where: {
        ...where,
        deletedAt: null,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        item: {
          include: {
            images: true,
            brand: true,
          },
        },
      },
    });

    return res.status(200).json(
      itemViews.map((itemView) => ({
        id: itemView.item.id,
        name: itemView.item.name,
        price: itemView.item.latestPrice,
        brand: {
          name: itemView.item.brand.name,
          label: itemView.item.brand.label,
        },
        image: itemView.item.images[0].url,
        isSoldOut: itemView.item.isSoldOut,
      }))
    );
  }
);

export const readItemViewsCount = handleExceptions(
  async (req: Request, res: Response<number>) => {
    const { itemId } = req.params;

    const itemViews = await prisma.itemView.findMany({
      where: {
        itemId: itemId,
      },
    });

    const totalViews = itemViews.reduce(
      (acc, itemView) => acc + itemView.quantity,
      0
    );

    return res.status(200).json(totalViews);
  }
);
