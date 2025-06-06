import { Request, Response } from "express";
import prisma from "../../helpers/prisma";
import { ReadCategoriesResponse } from "./category-types";
import { handleExceptions } from "../../helpers/utils";

export const readCategories = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<ReadCategoriesResponse>> => {
    const categories = await prisma.category.findMany();

    const response: ReadCategoriesResponse = {
      status: "success",
      message: "Categories fetched successfully",
      data: categories,
    };

    return res.status(200).json(response);
  }
);
