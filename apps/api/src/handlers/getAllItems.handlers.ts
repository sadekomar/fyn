import prisma from "../lib/prisma";
import { Request, Response } from "express";
import { handleExceptions } from "../lib/utils";
import { z } from "zod";
import { ImageSizes, ItemCardsData } from "../types";
import { equal } from "assert";

const QuerySchema = z.object({
  search: z.string().optional(),
  brands: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => (Array.isArray(val) ? val : val ? [val] : [])),
  gender: z.string().optional(),
  categories: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => (Array.isArray(val) ? val : val ? [val] : [])),
  colors: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => (Array.isArray(val) ? val : val ? [val] : [])),
  materials: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => (Array.isArray(val) ? val : val ? [val] : [])),
  showrooms: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => (Array.isArray(val) ? val : val ? [val] : [])),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  sort_by: z.string().optional(),
  in_stock: z
    .union([
      z.literal("true").transform(() => true),
      z.literal("false").transform(() => false),
      z.boolean(),
    ])
    .optional(),
});

export const getAllItems = handleExceptions(
  async (req: Request, res: Response) => {
    const parsedQuery = QuerySchema.safeParse(req.query);

    console.log("Running getAllItems");

    if (!parsedQuery.success) {
      return res.status(400).json({
        error: "Invalid query parameters",
        details: parsedQuery.error.format(),
      });
    }

    const {
      search,
      brands,
      gender,
      categories,
      colors,
      materials,
      showrooms,
      page,
      limit,
      sort_by,
      in_stock,
    } = parsedQuery.data;

    const where: any = {};

    if (hasValidValue(search)) {
      where.OR = [
        {
          name: {
            contains: search,
          },
        },
        {
          description: {
            contains: search,
          },
        },
      ];
    }
    if (hasValidValue(brands)) {
      where.brand = { name: { in: brands } };
    }
    if (hasValidValue(gender)) {
      where.gender = gender;
    }
    if (hasValidValue(categories)) {
      where.categories = { some: { name: { in: categories } } };
    }
    if (hasValidValue(colors)) {
      where.colors = { some: { name: { in: colors } } };
    }
    if (hasValidValue(materials)) {
      where.material = { name: { in: materials } };
    }
    if (hasValidValue(showrooms)) {
      where.showroom = { name: { in: showrooms } };
    }
    if (hasValidValue(in_stock)) {
      where.sizes = {
        some: {
          available: true,
        },
      };
    }

    const orderBy = getOrderBy(sort_by);

    const items = await prisma.item.findMany({
      take: limit || 300,
      orderBy,
      skip: page ? (page - 1) * (limit || 10) : 0,
      where,
      select: {
        id: true,
        name: true,
        latestPrice: true,
        brand: {
          select: {
            name: true,
          },
        },
        images: {
          take: 1,
          select: {
            url: true,
          },
        },
      },
    });

    // Get available colors with counts
    const colorsMetadata = await prisma.item.aggregate({
      where,
      _count: {
        _all: true,
      },
    });

    console.log("colorsMetadata:", colorsMetadata);

    type MetadataI = {
      count: number;
      genders: {
        name: string;
        count: number;
      }[];
      categories: {
        name: string;
        count: number;
      }[];
      colors: {
        name: string;
        count: number;
      }[];
      brands: {
        name: string;
        count: number;
      }[];
      materials: {
        name: string;
        count: number;
      }[];
    };

    const formattedItems: ItemCardsData[] = items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.latestPrice,
      brand: item.brand.name,
      image: item.images[0]?.url.replace(ImageSizes.PATTERN, ImageSizes.SMALL),
    }));

    return res.json(formattedItems);
  }
);

const hasValidValue = (param: any): boolean => {
  if (param === undefined || param === null) return false;
  if (param === "") return false;
  if (
    Array.isArray(param) &&
    (param.length === 0 || param.every((p) => p === ""))
  )
    return false;
  return true;
};

function getOrderBy(sort_by: string | undefined) {
  enum SortBy {
    DATE_ASC = "date-ascending",
    DATE_DESC = "date-descending",
    PRICE_ASC = "price-ascending",
    PRICE_DESC = "price-descending",
    NAME_ASC = "name-ascending",
    NAME_DESC = "name-descending",
  }

  const sortByMapping: { [key: string]: { [key: string]: "asc" | "desc" } } = {
    [SortBy.DATE_ASC]: { createdAt: "asc" },
    [SortBy.DATE_DESC]: { createdAt: "desc" },
    [SortBy.PRICE_ASC]: { latestPrice: "asc" },
    [SortBy.PRICE_DESC]: { latestPrice: "desc" },
    [SortBy.NAME_ASC]: { name: "asc" },
    [SortBy.NAME_DESC]: { name: "desc" },
  };
  const orderBy: { [key: string]: "asc" | "desc" } =
    sortByMapping[sort_by || SortBy.DATE_DESC];
  return orderBy;
}
