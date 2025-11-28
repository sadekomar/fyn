import { Request, Response } from "express";
import { CreateCategoryRequest, CreateCategoryResponse } from "./category";
import { handleExceptions } from "../../helpers/utils";
import { prisma } from "@repo/database";
import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

export const createCategory = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<CreateCategoryResponse>> => {
    const result = createCategorySchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: "error",
        error: result.error.flatten().fieldErrors,
      });
    }
    const { name }: CreateCategoryRequest = result.data;

    const category = await prisma.category.create({
      data: { name },
    });

    const response: CreateCategoryResponse = {
      status: "success",
      message: "Category created successfully",
      data: category,
    };

    return res.status(201).json(response);
  }
);
