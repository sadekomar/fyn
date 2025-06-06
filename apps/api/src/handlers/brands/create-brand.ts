import { handleExceptions } from "../../helpers/utils";
import { Request, Response } from "express";
import prisma from "../../helpers/prisma";
import { CreateBrandRequest, CreateBrandResponse } from "./brand-types";

export const createBrand = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<CreateBrandResponse>> => {
    const { name, description, image }: CreateBrandRequest = req.body;

    const brand = await prisma.brand.create({
      data: { name, description, image },
    });

    return res.status(201).json({
      status: "success",
      message: "Brand created successfully",
      data: brand,
    });
  }
);
