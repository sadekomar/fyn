import { handleExceptions } from "../../helpers/utils";
import { Request, Response } from "express";
import prisma from "../../helpers/prisma";
import { Genders, ItemPageResponse } from "./item";

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
            label: true,
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

    const latestPrice = item.prices[item.prices.length - 1].price;
    let lowestPrice: number | null = item.prices.sort(
      (a, b) => a.price - b.price
    )[0].price;
    let highestPrice: number | null = item.prices.sort(
      (a, b) => b.price - a.price
    )[0].price;
    lowestPrice = lowestPrice == latestPrice ? null : lowestPrice;
    highestPrice = highestPrice == latestPrice ? null : highestPrice;

    return res.status(200).json({
      status: "success",
      id: item.id,
      name: item.name,
      description: item.description,
      price: latestPrice,
      lowestPrice: lowestPrice,
      highestPrice: highestPrice,
      brand: {
        name: item.brand.name,
        label: item.brand.label,
      },
      link: item.link,
      images: item.images.map((image) => image.url),
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
