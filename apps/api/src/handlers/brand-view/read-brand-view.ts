import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import { prisma } from "@repo/database";

type BrandView = {
  id: string;
  name: string;
};

export const readUserBrandViews = handleExceptions(
  async (req: Request, res: Response<BrandView[]>) => {
    const { userId } = req.params;

    const brandViews = await prisma.brandView.findMany({
      where: {
        userId: userId,
      },
      include: {
        brand: true,
      },
    });

    return res.status(200).json(
      brandViews.map((brandView) => ({
        id: brandView.brand.id,
        name: brandView.brand.name,
      }))
    );
  }
);

export const readBrandViewsCount = handleExceptions(
  async (req: Request, res: Response<number>) => {
    const { brandId } = req.params;

    const brandViews = await prisma.brandView.findMany({
      where: {
        brandId: brandId,
      },
    });

    const totalViews = brandViews.reduce(
      (acc, brandView) => acc + brandView.quantity,
      0
    );

    return res.status(200).json(totalViews);
  }
);
