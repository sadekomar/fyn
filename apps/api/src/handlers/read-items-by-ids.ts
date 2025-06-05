import prisma from "../helpers/prisma";
import { handleExceptions } from "../helpers/utils";
import { Request, Response } from "express";
import { ImageSizes, ItemCardsI } from "../types/types";
import { Gender } from "@prisma/client";

// Function to translate gender values from request to enum values
const translateGender = (gender: string): Gender | null => {
  const genderMap: Record<string, Gender> = {
    men: Gender.MALE,
    women: Gender.FEMALE,
    unisex: Gender.UNISEX,
    kids: Gender.KIDS,
  };

  return genderMap[gender.toLowerCase()] || null;
};

export const readItemsByIds = handleExceptions(
  async (req: Request, res: Response) => {
    const { ids } = req.body;
    console.log("ids", ids);

    const items = await prisma.item.findMany({
      where: {
        id: { in: ids },
      },
      select: {
        id: true,
        name: true,
        latestPrice: true,
        gender: true,
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
    // Create a map of items by ID for O(1) lookup
    const itemsMap = new Map(items.map((item) => [item.id, item]));

    // Preserve original order by mapping through the input IDs array
    const formattedItems: ItemCardsI[] = ids
      .filter((id: string) => itemsMap.has(id)) // Filter out IDs that don't have matching items
      .map((id: string) => {
        const item = itemsMap.get(id)!;
        return {
          id: item.id,
          name: item.name,
          price: item.latestPrice,
          brand: item.brand.name,
          image: item.images[0].url.replace(
            ImageSizes.PATTERN,
            ImageSizes.SMALL
          ),
          gender: item.gender ? translateGender(item.gender) : null,
        };
      });

    return res.json(formattedItems);
  }
);
