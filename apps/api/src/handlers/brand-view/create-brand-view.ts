import { Request, Response } from "express";

import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { CreateBrandViewRequest, CreateBrandViewResponse } from "./brand-view";

export const createBrandView = handleExceptions(
  async (
    req: Request<{}, {}, CreateBrandViewRequest>,
    res: Response<CreateBrandViewResponse>
  ) => {
    const { brandName, userId } = req.body;

    const brand = await prisma.brand.findUnique({
      where: {
        name: brandName,
      },
    });

    if (!brand) {
      return res.status(404).json({
        status: "error",
        message: "Brand not found",
      });
    }
    const brandId = brand.id;

    const existingBrandView = await prisma.brandView.findFirst({
      where: {
        AND: [
          {
            brandId: brandId,
          },
          {
            userId: userId,
          },
        ],
      },
    });

    if (existingBrandView) {
      await prisma.brandView.update({
        where: {
          id: existingBrandView.id,
        },
        data: {
          quantity: existingBrandView.quantity + 1,
        },
      });

      return res.status(200).json({
        status: "success",
        message: "Brand view updated",
      });
    } else {
      await prisma.brandView.create({
        data: {
          brandId,
          userId,
        },
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Brand view created",
    });
  }
);
