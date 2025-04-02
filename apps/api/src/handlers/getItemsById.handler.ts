import prisma from "../lib/prisma";
import { handleExceptions } from "../lib/utils";
import { Request, Response } from "express";
import { ImageSizes, ItemCardsData } from "../types";

export const getItemsById = handleExceptions(
  async (req: Request, res: Response) => {
    const { ids } = req.body;

    const items = await prisma.item.findMany({
      where: {
        id: { in: ids },
      },
      select: {
        id: true,
        name: true,
        latestPrice: true,
        brand: {
          select: {
            name: true,
          },
        },
        images: {
          select: {
            url: true,
          },
        },
      },
    });

    const formattedItems: ItemCardsData[] = items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.latestPrice,
      brand: item.brand.name,
      image: item.images[0].url.replace(ImageSizes.PATTERN, ImageSizes.SMALL),
    }));

    return res.json(formattedItems);
  }
);
