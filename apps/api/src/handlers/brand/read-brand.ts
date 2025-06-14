import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { ImageSizes } from "../item/item";

type BrandData = {
  name: string;
  id: string;
  description: string | null;
  image: string | null;
  logo: string | null;
  inTrash: boolean;
} | null;

export const readBrand = handleExceptions(
  async (req: Request, res: Response<BrandData>) => {
    const { name } = req.params;

    const brand = await prisma.brand.findUnique({
      where: { name, inTrash: false },
    });

    brand?.image?.replaceAll(ImageSizes.PATTERN, ImageSizes.SMALL);

    return res.status(200).json(brand);
  }
);
