import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import { prisma } from "@repo/database";

type CategoryView = {
  id: string;
  name: string;
};

export const readUserCategoryViews = handleExceptions(
  async (req: Request, res: Response<CategoryView[]>) => {
    const { userId } = req.params;

    const categoryViews = await prisma.categoryView.findMany({
      where: {
        userId: userId,
      },
      include: {
        category: true,
      },
    });

    return res.status(200).json(
      categoryViews.map((categoryView) => ({
        id: categoryView.category.id,
        name: categoryView.category.name,
      }))
    );
  }
);

export const readCategoryViewsCount = handleExceptions(
  async (req: Request, res: Response<number>) => {
    const { categoryId } = req.params;

    const categoryViews = await prisma.categoryView.findMany({
      where: {
        categoryId: categoryId,
      },
    });

    const totalViews = categoryViews.reduce(
      (acc, categoryView) => acc + categoryView.quantity,
      0
    );

    return res.status(200).json(totalViews);
  }
);
