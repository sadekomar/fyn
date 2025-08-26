import prisma from "../../helpers/prisma";
import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import { z } from "zod";
import { CategoriesI, ItemCardsI, MetadataI } from "./item";
import { constructWhere } from "../../helpers/construct-where";
import { getSortBy } from "../../helpers/get-sort-by";
import { Gender } from "@prisma/client";
import { hasValidValue } from "../../helpers/has-valid-value";
import { ErrorResponse } from "../like/like";

const genderMap: Record<string, Gender> = {
  MALE: Gender.MALE,
  FEMALE: Gender.FEMALE,
  UNISEX: Gender.UNISEX,
  KIDS: Gender.KIDS,
};

const QuerySchema = z.object({
  search: z.string().optional(),
  brands: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => (Array.isArray(val) ? val : val ? [val] : [])),
  genders: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => (Array.isArray(val) ? val : val ? [val] : [])),
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
  is_partnered_brand: z
    .union([
      z.literal("true").transform(() => true),
      z.literal("false").transform(() => false),
      z.boolean(),
    ])
    .optional(),
  in_stock: z
    .union([
      z.literal("true").transform(() => true),
      z.literal("false").transform(() => false),
      z.boolean(),
    ])
    .optional(),
});

export type QueryI = z.infer<typeof QuerySchema>;

export const readItems = handleExceptions(
  async (req: Request, res: Response): Promise<Response<ItemCardsI[]>> => {
    const parsedQuery = QuerySchema.safeParse(req.query);

    if (!parsedQuery.success) {
      return res.status(400).json({
        error: "Invalid query parameters",
        details: parsedQuery.error.format(),
      });
    }

    const { page, limit, sort_by } = parsedQuery.data;

    const where: any = constructWhere(parsedQuery.data);

    const orderBy = getSortBy(sort_by);

    const items = await prisma.item.findMany({
      take: limit || 50,
      orderBy,
      skip: page ? (page - 1) * (limit || 50) : 0,
      where,
      select: {
        id: true,
        name: true,
        latestPrice: true,
        brand: {
          select: {
            name: true,
            label: true,
            isPartnerBrand: true,
          },
        },
        material: {
          select: {
            name: true,
          },
        },
        gender: true,
        categories: {
          include: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        colors: {
          select: {
            name: true,
          },
        },
        images: {
          select: {
            url: true,
          },
        },
        isSoldOut: true,
      },
    });

    const formattedItems: ItemCardsI[] = items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.latestPrice,
      brand: {
        name: item.brand.name,
        label: item.brand.label,
        isPartneredBrand: item.brand.isPartnerBrand,
      },
      image: item.images[0]?.url,
      isSoldOut: item.isSoldOut,
    }));

    return res.status(200).json(formattedItems);
  }
);

/**
 * get categories and their images for each brand
 */
export const readCategoriesWithImages = handleExceptions(
  async (req: Request, res: Response): Promise<Response<CategoriesI[]>> => {
    const parsedQuery = QuerySchema.safeParse(req.query);

    if (!parsedQuery.success) {
      return res.status(400).json({
        error: "Invalid query parameters",
        details: parsedQuery.error.format(),
      });
    }

    const where: any = constructWhere(parsedQuery.data);
    console.log("categories with images where", where);

    const items = await prisma.item.findMany({
      where,
      select: {
        categories: {
          include: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const categoryCount = items.reduce(
      (acc, item) => {
        item.categories.forEach((category) => {
          if (!acc[category.category.name]) {
            acc[category.category.name] = 0;
          }
          acc[category.category.name]++;
        });
        return acc;
      },
      {} as Record<string, number>
    );

    const formattedCategories: CategoriesI[] = Object.entries(
      categoryCount
    ).map(([name, count]) => ({
      name,
      count,
      image:
        items.find((item) => item.categories.some((c) => c.category.name === name))
          ?.images[0]?.url ?? null,
    }));

    return res.status(200).json(formattedCategories);
  }
);

export const readItemsMetadata = handleExceptions(
  async (req: Request, res: Response<MetadataI | ErrorResponse>) => {
    const parsedQuery = QuerySchema.safeParse(req.query);

    if (!parsedQuery.success) {
      return res.status(400).json({
        status: "error",
        error: { root: ["Invalid query parameters"] },
      });
    }

    // colors selected, don't include colors in the where
    // when colors are selected, don't include colors without the where
    // so i want to run another query to get the colors with all other wheres but the colors

    const where: any = constructWhere(parsedQuery.data);

    // when color is selected, color won't be included in the where constructor

    const items = await prisma.item.findMany({
      where,
      select: {
        gender: true,
        brand: true,
        categories: {
          include: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        colors: true,
        material: true,
      },
    });

    const itemCount = items.length;

    const genderCount = items.reduce(
      (acc, item) => {
        const gender = item.gender;
        if (!gender) return acc;
        if (!acc[gender]) {
          acc[gender] = 0;
        }
        acc[gender]++;
        return acc;
      },
      {} as Record<string, number>
    );

    const brandCount = items.reduce(
      (acc, item) => {
        const brandName = item.brand.name;
        if (!acc[brandName]) {
          acc[brandName] = 0;
        }
        acc[brandName]++;
        return acc;
      },
      {} as Record<string, number>
    );

    const categoriesCount = items.reduce(
      (acc, item) => {
        const categories = item.categories;
        categories.forEach((c) => {
          if (!acc[c.category.name]) {
            acc[c.category.name] = 0;
          }
          acc[c.category.name]++;
        });
        return acc;
      },
      {} as Record<string, number>
    );

    const colorsCount = items.reduce(
      (acc, item) => {
        const colors = item.colors;
        colors.forEach((color) => {
          if (!acc[color.name]) {
            acc[color.name] = 0;
          }
          acc[color.name]++;
        });
        return acc;
      },
      {} as Record<string, number>
    );

    const materialCount = items.reduce(
      (acc, item) => {
        const materialName = item.material?.name;
        if (!materialName) return acc;
        if (!acc[materialName]) {
          acc[materialName] = 0;
        }
        acc[materialName]++;
        return acc;
      },
      {} as Record<string, number>
    );

    let gendersMetadata = Object.entries(genderCount).map(([name, count]) => ({
      name,
      count,
    }));
    let brandsMetadata = Object.entries(brandCount).map(([name, count]) => ({
      name,
      count,
    }));
    let categoriesMetadata = Object.entries(categoriesCount).map(
      ([name, count]) => ({
        name,
        count,
      })
    );
    let colorsMetadata = Object.entries(colorsCount).map(([name, count]) => ({
      name,
      count,
    }));
    let materialsMetadata = Object.entries(materialCount).map(
      ([name, count]) => ({
        name,
        count,
      })
    );

    // Recalculate metadata for any active filters
    if (hasValidValue(parsedQuery.data.colors)) {
      // remove colors from the where
      delete where.colors;
      const items = await prisma.item.findMany({
        where,
        select: {
          colors: true,
        },
      });
      const colorsCount = items.reduce(
        (acc, item) => {
          item.colors.forEach((color) => {
            if (!acc[color.name]) {
              acc[color.name] = 0;
            }
            acc[color.name]++;
          });
          return acc;
        },
        {} as Record<string, number>
      );
      colorsMetadata = Object.entries(colorsCount).map(([name, count]) => ({
        name,
        count,
      }));
    }

    // for brands page don't remove brands from the where
    // filtered automatically
    const brandsFilteredAutomatically = false;
    if (hasValidValue(parsedQuery.data.brands) && brandsFilteredAutomatically) {
      delete where.brand;
      const items = await prisma.item.findMany({
        where,
        select: {
          brand: true,
        },
      });
      const brandCount = items.reduce(
        (acc, item) => {
          const brandName = item.brand?.name;
          if (!brandName) return acc;
          if (!acc[brandName]) {
            acc[brandName] = 0;
          }
          acc[brandName]++;
          return acc;
        },
        {} as Record<string, number>
      );
      brandsMetadata = Object.entries(brandCount).map(([name, count]) => ({
        name,
        count,
      }));
    }

    const categoriesFilteredAutomatically = false;
    if (
      hasValidValue(parsedQuery.data.categories) &&
      categoriesFilteredAutomatically
    ) {
      delete where.categories;
      const items = await prisma.item.findMany({
        where,
        select: {
          categories: {
            include: {
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      const categoriesCount = items.reduce(
        (acc, item) => {
          item.categories.forEach((category) => {
            if (!acc[category.category.name]) {
              acc[category.category.name] = 0;
            }
            acc[category.category.name]++;
          });
          return acc;
        },
        {} as Record<string, number>
      );
      categoriesMetadata = Object.entries(categoriesCount).map(
        ([name, count]) => ({
          name,
          count,
        })
      );
    }

    if (hasValidValue(parsedQuery.data.genders)) {
      delete where.gender;
      const items = await prisma.item.findMany({
        where,
        select: {
          gender: true,
        },
      });
      const genderCount = items.reduce(
        (acc, item) => {
          const gender = item.gender;
          if (!gender) return acc;
          if (!acc[gender]) {
            acc[gender] = 0;
          }
          acc[gender]++;
          return acc;
        },
        {} as Record<string, number>
      );
      gendersMetadata = Object.entries(genderCount).map(([name, count]) => ({
        name,
        count,
      }));
    }

    if (hasValidValue(parsedQuery.data.materials)) {
      delete where.material;
      const items = await prisma.item.findMany({
        where,
        select: {
          material: true,
        },
      });
      const materialCount = items.reduce(
        (acc, item) => {
          const materialName = item.material?.name;
          if (!materialName) return acc;
          if (!acc[materialName]) {
            acc[materialName] = 0;
          }
          acc[materialName]++;
          return acc;
        },
        {} as Record<string, number>
      );
      materialsMetadata = Object.entries(materialCount).map(
        ([name, count]) => ({
          name,
          count,
        })
      );
    }

    const metadata: MetadataI = {
      items: {
        name: "items",
        count: itemCount,
      },
      genders: gendersMetadata,
      categories: categoriesMetadata,
      colors: colorsMetadata,
      brands: brandsMetadata,
      materials: materialsMetadata,
    };
    return res.status(200).json(metadata);
  }
);
