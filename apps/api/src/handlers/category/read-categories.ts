import { Request, Response } from "express";
import { prisma } from "@repo/database";
import { ReadCategoriesResponse } from "./category";
import { handleExceptions } from "../../helpers/utils";

type CategoryNode = {
  slug: string;
  name: string;
  label: string;
  images?: {
    womenImage?: string;
    menImage?: string;
    kidsImage?: string;
  };
  children?: CategoryNode[];
};

// Helper function to recursively build category tree
const buildCategoryTree = (
  categories: any[],
  parentId: string | null = null
): CategoryNode[] => {
  return categories
    .filter((category) => category.parentId === parentId)
    .map((category) => ({
      slug: category.slug || "",
      name: category.name || "",
      label: category.label || "",
      images: {
        womenImage: category.womenImage || "",
        menImage: category.menImage || "",
        kidsImage: category.kidsImage || "",
      },
      children: buildCategoryTree(categories, category.id),
    }));
};

export const readCategories = handleExceptions(
  async (req: Request, res: Response<CategoryNode[]>) => {
    const categories = await prisma.category.findMany({
      include: {
        children: true,
        parent: true,
      },
      where: {
        inTrash: false,
      },
    });

    // Build the complete category tree recursively
    const categoryNodes: CategoryNode[] = buildCategoryTree(categories);

    return res.status(200).json(categoryNodes);
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

export const readMoreCategories = handleExceptions(
  async (req: Request, res: Response<ReadCategoriesResponse>) => {
    const moreCategories = [
      "jeans",
      "polos",
      "shoes",
      "swimwear",
      "tanks",
      "dresses",
      "necklaces",
      "earrings",
    ];
    const categories = await prisma.category.findMany({
      where: {
        name: {
          in: moreCategories,
        },
        inTrash: false,
      },
    });

    return res.status(200).json(categories);
  }
);
