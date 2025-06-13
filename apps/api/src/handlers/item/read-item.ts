import { handleExceptions } from "../../helpers/utils";
import { Request, Response } from "express";
import prisma from "../../helpers/prisma";
import { Genders, ImageSizes, ItemPageResponse } from "./item";

export const readItem = handleExceptions(
  async (req: Request, res: Response<ItemPageResponse>) => {
    const { id } = req.params;

    const item = await prisma.item.findUnique({
      where: { id, inTrash: false, deletedAt: null },
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

    if (!item) {
      return res.status(404).json({
        status: "error",
        error: {
          root: ["Item not found"],
        },
      });
    }

    return res.status(200).json({
      status: "success",
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.prices[0].price,
      brand: item.brand.name,
      link: item.link,
      images: item.images.map((image) =>
        image.url.replaceAll(ImageSizes.PATTERN, ImageSizes.SMALL)
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
    });
  }
);
