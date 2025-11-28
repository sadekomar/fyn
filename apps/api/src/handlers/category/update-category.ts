import { Request, Response } from "express";
import { prisma } from "@repo/database";
import { handleExceptions } from "../../helpers/utils";
import { UpdateCategoryRequest, UpdateCategoryResponse } from "./category";
import { z } from "zod";

const updateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

export const updateCategory = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<UpdateCategoryResponse>> => {
    const { id } = req.params;
    const result = updateCategorySchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: "error",
        error: result.error.flatten().fieldErrors,
      });
    }

    const { name }: UpdateCategoryRequest = result.data;

    const category = await prisma.category.update({
      where: { id },
      data: { name },
    });

    const response: UpdateCategoryResponse = {
      status: "success",
      message: "Category updated successfully",
      data: category,
    };

    return res.status(200).json(response);
  }
);
