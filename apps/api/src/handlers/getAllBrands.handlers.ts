import prisma from "../lib/prisma";
import { handleExceptions } from "../lib/utils";
import { Request, Response } from "express";

export const getAllBrands = handleExceptions(
  async (req: Request, res: Response) => {
    const brands = await prisma.brand.findMany();

    return res.json(brands);
  }
);
