import { handleExceptions } from "./lib/utils";
import { Request, Response } from "express";
import prisma from "./lib/prisma";

export const getItemById = handleExceptions(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);
    const item = await prisma.item.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        gender: true,
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
            name: true,
            available: true,
          },
        },
        colors: {
          select: {
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
    return res.json(item);
  }
);
