import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { ImageSizes, ItemCardsI } from "../item/item";

export const readUserItemViews = handleExceptions(
  async (req: Request, res: Response<ItemCardsI[]>) => {
    const { userId } = req.params;

    const itemViews = await prisma.itemView.findMany({
      where: {
        userId: userId,
      },
      include: {
        item: {
          include: {
            images: true,
          },
        },
      },
    });

    return res.status(200).json(
      itemViews.map((itemView) => ({
        id: itemView.item.id,
        name: itemView.item.name,
        price: itemView.item.latestPrice,
        brand: itemView.item.brandId,
        image: itemView.item.images[0].url.replaceAll(
          ImageSizes.PATTERN,
          ImageSizes.SMALL
        ),
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
