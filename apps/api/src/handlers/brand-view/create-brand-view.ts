import { Request, Response } from "express";

import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { CreateBrandViewRequest, CreateBrandViewResponse } from "./brand-view";

export const createBrandView = handleExceptions(
  async (
    req: Request<{}, {}, CreateBrandViewRequest>,
    res: Response<CreateBrandViewResponse>
  ) => {
    const { brandName, type } = req.body;

    const brand = await prisma.brand.findUnique({
      where: { name: brandName },
    });
    if (!brand) {
      return res.status(404).json({
        status: "error",
        message: "Brand not found",
      });
    }

    if (type === "user") {
      const { userId } = req.body;
      const existingBrandView = await prisma.brandView.findFirst({
        where: {
          AND: [{ brandId: brand.id }, { userId: userId }],
        },
      });
      if (existingBrandView) {
        await prisma.brandView.update({
          where: { id: existingBrandView.id },
          data: { quantity: existingBrandView.quantity + 1 },
        });

        return res.status(200).json({
          status: "success",
          message: "Brand view updated",
        });
      } else {
        await prisma.brandView.create({
          data: { brandId: brand.id, userId },
        });
      }
    } else {
      const { guestUserId } = req.body;
      const existingBrandView = await prisma.brandView.findFirst({
        where: {
          AND: [{ brandId: brand.id }, { guestUserId: guestUserId }],
        },
      });
      if (existingBrandView) {
        await prisma.brandView.update({
          where: { id: existingBrandView.id },
          data: { quantity: existingBrandView.quantity + 1 },
        });

        return res.status(200).json({
          status: "success",
          message: "Brand view updated",
        });
      } else {
        await prisma.brandView.create({
          data: { brandId: brand.id, guestUserId },
        });
      }
    }

    return res.status(201).json({
      status: "success",
      message: "Brand view created",
    });
  }
);
