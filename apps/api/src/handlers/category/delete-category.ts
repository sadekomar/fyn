import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import { prisma } from "@repo/database";
import { DeleteCategoryResponse } from "./category";

export const deleteCategory = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<DeleteCategoryResponse>> => {
    const { id } = req.params;

    const category = await prisma.category.delete({
      where: { id },
    });

    const response: DeleteCategoryResponse = {
      status: "success",
      message: "Category deleted successfully",
      data: category,
    };

    return res.status(200).json(response);
  }
);
