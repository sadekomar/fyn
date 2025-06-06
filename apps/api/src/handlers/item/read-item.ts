import { handleExceptions } from "../../helpers/utils";
import { Request, Response } from "express";
import prisma from "../../helpers/prisma";
import { Genders, ImageSizes, ItemPageI } from "./item-types";

export const readItem = handleExceptions(
  async (req: Request, res: Response): Promise<Response<ItemPageI>> => {
    const { id } = req.params;

    const item = await prisma.item.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        gender: true,
        link: true,
        material: {
          select: {
            name: true,
          },
        },
        images: {
          select: {
            url: true,
          },
        },
        sizes: {
          select: {
            id: true,
            name: true,
            available: true,
          },
        },
        colors: {
          select: {
            id: true,
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
        categories: {
          select: {
            name: true,
          },
        },
        prices: {
          select: {
            price: true,
            createdAt: true,
          },
        },
      },
    });
    console.log(item);
    if (!item) {
      return res.json([]);
    }

    const formattedItem: ItemPageI = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.prices[0].price,
      brand: item.brand.name,
      link: item.link,
      images: item.images.map((image) =>
        image.url.replace(ImageSizes.PATTERN, ImageSizes.SMALL)
      ),
      categories: item.categories.map((category) => category.name),
      colors: item.colors.map((color) => ({
        id: color.id,
        name: color.name,
      })),
      gender: item.gender || Genders.UNISEX,
      material: item?.material?.name || "Other",
      sizes: item.sizes.map((size) => ({
        id: size.id,
        name: size.name,
        available: size.available,
      })),
    };
    return res.status(200).json(formattedItem);
  }
);
