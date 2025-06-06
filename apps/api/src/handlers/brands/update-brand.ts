import { Brand } from "@prisma/client";
import prisma from "../../helpers/prisma";
import { handleExceptions } from "../../helpers/utils";
import { Request, Response } from "express";
import { UpdateBrandRequest, UpdateBrandResponse } from "./brand-types";

export const updateBrand = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<UpdateBrandResponse>> => {
    const { id } = req.params;
    const { name, description, image, logo }: UpdateBrandRequest = req.body;

    const brand = await prisma.brand.update({
      where: { id },
      data: { name, description, image, logo },
    });

    const response: UpdateBrandResponse = {
      status: "success",
      message: "Brand updated successfully",
      data: brand,
    };

    return res.status(200).json(response);
  }
);
