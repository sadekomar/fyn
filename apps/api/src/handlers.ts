import prisma from "./lib/prisma";
import { Request, Response } from "express";
import { handleExceptions } from "./lib/utils";

export const getAllItems = handleExceptions(
  async (req: Request, res: Response) => {
    const {
      search,
      brand,
      gender,
      category,
      color,
      material,
      showroom,
      page,
      limit,
      sort_by,
    } = req.query;

    console.log(page, brand, search, limit, sort_by);

    let where: any = {};

    if (search) {
      where.name = { contains: search };
    }
    if (brand) {
      where.brand = { contains: brand };
    }
    if (gender) {
      where.gender = { contains: gender };
    }
    if (category) {
      where.category = { contains: category };
    }

    const items = await prisma.item.findMany({
      take: 300,
      where: {
        brand: {
          name: {
            contains: brand as string,
          },
        },
        // at least one size is available
        // in stock only
        sizes: {
          some: {
            available: true,
          },
        },
        // out of stock only
        // sizes: {
        //   every: {
        //     available: false,
        //   },
        // },
      },
      select: {
        name: true,
        latestPrice: true,
        images: {
          select: {
            url: true,
          },
        },
        sizes: true,
      },
    });

    return res.json(items);
  }
);
