import { Request, Response } from "express";
import prisma from "../../helpers/prisma";
import { Category } from "@prisma/client";

export const readCategories = async (
  req: Request,
  res: Response<Category[]>
) => {
  const categories = await prisma.category.findMany();
  res.status(200).json(
    categories.map((category) => ({
      id: category.id,
      name: category.name,
    }))
  );
};
