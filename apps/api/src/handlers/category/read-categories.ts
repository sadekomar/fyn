import { Request, Response } from "express";
import prisma from "../../helpers/prisma";
import { ReadCategoriesResponse } from "./category";
import { handleExceptions } from "../../helpers/utils";

export const readCategories = handleExceptions(
  async (req: Request, res: Response<ReadCategoriesResponse>) => {
    const categories = await prisma.category.findMany();

    return res.status(200).json(categories);
  }
);

export const readPopularCategories = handleExceptions(
  async (req: Request, res: Response<ReadCategoriesResponse>) => {
    const popularCategories = [
      "shirts",
      "pants",
      "tops",
      "accessories",
      "bags",
      "sets",
      "t-shirts",
      "sweatpants",
    ];
    const categories = await prisma.category.findMany({
      where: {
        name: {
          in: popularCategories,
        },
      },
    });

    return res.status(200).json(categories);
  }
);
