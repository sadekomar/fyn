import { Request, Response } from "express";

import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import {
  CreateCategoryViewRequest,
  CreateCategoryViewResponse,
} from "./category-view";

export const createCategoryView = handleExceptions(
  async (
    req: Request<{}, {}, CreateCategoryViewRequest>,
    res: Response<CreateCategoryViewResponse>
  ) => {
    const { categoryName, type } = req.body;

    const category = await prisma.category.findUnique({
      where: { name: categoryName },
    });
    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }
    const categoryId = category.id;

    if (type === "user") {
      const { userId } = req.body;
      const existingCategoryView = await prisma.categoryView.findFirst({
        where: {
          AND: [{ categoryId: categoryId }, { userId: userId }],
        },
      });
      if (existingCategoryView) {
        await prisma.categoryView.update({
          where: { id: existingCategoryView.id },
          data: { quantity: existingCategoryView.quantity + 1 },
        });

        return res.status(200).json({
          status: "success",
          message: "Category view updated",
        });
      } else {
        await prisma.categoryView.create({
          data: { categoryId, userId },
        });
      }
    } else {
      const { guestUserId } = req.body;
      const existingCategoryView = await prisma.categoryView.findFirst({
        where: {
          AND: [{ categoryId: categoryId }, { guestUserId: guestUserId }],
        },
      });
      if (existingCategoryView) {
        await prisma.categoryView.update({
          where: { id: existingCategoryView.id },
          data: { quantity: existingCategoryView.quantity + 1 },
        });

        return res.status(200).json({
          status: "success",
          message: "Category view updated",
        });
      } else {
        await prisma.categoryView.create({
          data: { categoryId, guestUserId },
        });
      }
    }

    return res.status(201).json({
      status: "success",
      message: "Category view created",
    });
  }
);
