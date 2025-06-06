import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { CreateItemResponse } from "./item-types";
import { z } from "zod";
import { Gender } from "@prisma/client";

const CreateItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  latestPrice: z.number().int().positive("Price must be a positive number"),
  link: z.string().url("Link must be a valid URL"),
  brandId: z.string().uuid("Brand ID must be a valid UUID"),
  materialId: z.string().uuid("Material ID must be a valid UUID").optional(),
  gender: z.nativeEnum(Gender).optional(),
  categories: z
    .array(z.string().uuid("Category ID must be a valid UUID"))
    .optional(),
  colors: z.array(z.string().uuid("Color ID must be a valid UUID")).optional(),
  sizes: z.array(z.string().uuid("Size ID must be a valid UUID")).optional(),
  images: z.array(z.string().url("Image URL must be a valid URL")).optional(),
});

export const createItem = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<CreateItemResponse>> => {
    const parsedBody = CreateItemSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        status: "error",
        error: parsedBody.error.format(),
      });
    }

    const {
      name,
      description,
      latestPrice,
      link,
      brandId,
      materialId,
      gender,
      categories,
      colors,
      sizes,
      images,
    } = parsedBody.data;

    // Create initial price record
    const initialPrice = {
      price: latestPrice,
    };

    const item = await prisma.item.create({
      data: {
        name,
        description,
        latestPrice,
        link,
        brandId,
        materialId,
        gender,
        prices: {
          create: initialPrice,
        },
        categories: categories
          ? {
              connect: categories.map((id) => ({ id })),
            }
          : undefined,
        colors: colors
          ? {
              connect: colors.map((id) => ({ id })),
            }
          : undefined,
        sizes: sizes
          ? {
              connect: sizes.map((id) => ({ id })),
            }
          : undefined,
        images: images
          ? {
              create: images.map((url) => ({ url })),
            }
          : undefined,
      },
      include: {
        brand: true,
        material: true,
        categories: true,
        colors: true,
        sizes: true,
        images: true,
        prices: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    return res.status(201).json({
      status: "success",
      message: "Item created successfully",
      data: item,
    });
  }
);
