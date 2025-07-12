import prisma from "../../helpers/prisma";
import { handleExceptions } from "../../helpers/utils";
import { Request, Response } from "express";
import { ItemCardsI } from "./item";
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
  async (
    req: Request<{}, {}, { ids: string[] }>,
    res: Response<ItemCardsI[]>
  ) => {
    const { ids } = req.body;

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
            label: true,
          },
        },
        images: {
          select: {
            url: true,
          },
        },
        isSoldOut: true,
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
          brand: {
            name: item.brand.name,
            label: item.brand.label,
          },
          image: item.images[0].url,
          gender: item.gender ? translateGender(item.gender) : null,
          isSoldOut: item.isSoldOut,
        };
      });

    return res.status(200).json(formattedItems);
  }
);
