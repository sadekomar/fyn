import prisma from "../../helpers/prisma";
import { handleExceptions } from "../../helpers/utils";
import { Request, Response } from "express";
import { ReadBrandsByLetterResponse, ReadBrandsResponse } from "./brand-types";
import { Brand } from "@prisma/client";

export const readBrands = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<ReadBrandsResponse>> => {
    const brands = await prisma.brand.findMany({
      orderBy: {
        name: "asc",
      },
    });

    const response: ReadBrandsResponse = {
      status: "success",
      message: "Brands fetched successfully",
      data: brands,
    };

    return res.status(200).json(response);
  }
);

export const readBrandsByLetter = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<ReadBrandsByLetterResponse>> => {
    const brands = await prisma.brand.findMany({
      orderBy: {
        name: "asc",
      },
    });

    const brandsByLetter = brands.reduce(
      (acc, brand) => {
        const letter = brand.name[0].toUpperCase();
        if (!acc[letter]) {
          acc[letter] = [];
        }
        acc[letter].push(brand);
        return acc;
      },
      {} as Record<string, Brand[]>
    );

    const response: ReadBrandsByLetterResponse = {
      status: "success",
      message: "Brands fetched successfully",
      data: brandsByLetter,
    };

    return res.status(200).json(response);
  }
);
