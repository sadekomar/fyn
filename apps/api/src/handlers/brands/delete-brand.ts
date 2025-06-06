import { Brand } from "@prisma/client";
import prisma from "../../helpers/prisma";
import { handleExceptions } from "../../helpers/utils";
import { Request, Response } from "express";
import { DeleteBrandResponse } from "./brand-types";

export const deleteBrand = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<DeleteBrandResponse>> => {
    const { id } = req.params;

    const brand = await prisma.brand.delete({
      where: { id },
    });

    const response: DeleteBrandResponse = {
      status: "success",
      message: "Brand deleted successfully",
      data: brand,
    };

    return res.status(200).json(response);
  }
);
