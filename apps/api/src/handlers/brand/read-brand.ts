import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import { prisma } from "@repo/database";
import { ReadBrandResponse } from "./brand";

export const readBrand = handleExceptions(
  async (req: Request, res: Response<ReadBrandResponse>) => {
    const { name } = req.params;

    const brand = await prisma.brand.findUnique({
      where: { name, inTrash: false },
    });

    if (!brand) {
      return res.status(404).json(null);
    }

    return res.status(200).json({
      id: brand?.id,
      name: brand?.name,
      description: brand?.description,
      image: brand?.image,
      logo: brand?.logo,
      label: brand?.label,
      inTrash: brand?.inTrash,
    });
  }
);
