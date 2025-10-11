import prisma from "../../helpers/prisma";
import { handleExceptions } from "../../helpers/utils";
import { Request, Response } from "express";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { ErrorResponse } from "../like/like";
import {
  ReadFollowedBrandsRequest,
  ReadFollowedBrandsResponse,
} from "./brand-follow";

const ReadBrandFollowsRequestSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("user"),
    userId: z.string(),
  }),
  z.object({
    type: z.literal("guest"),
    guestUserId: z.string(),
  }),
]);

export const readFollowedBrands = handleExceptions(
  async (
    req: Request<{}, {}, ReadFollowedBrandsRequest>,
    res: Response<ReadFollowedBrandsResponse | ErrorResponse>
  ) => {
    const parsedQuery = ReadBrandFollowsRequestSchema.safeParse(req.query);
    if (!parsedQuery.success) {
      return res.status(400).json({
        status: "error",
        error: {
          root: ["Invalid request query"],
        },
      });
    }

    const { type } = parsedQuery.data;
    let where: Prisma.BrandFollowWhereInput;
    if (type === "user") {
      where = {
        userId: parsedQuery.data.userId,
      };
    } else {
      where = {
        guestUserId: parsedQuery.data.guestUserId,
      };
    }

    const brandFollows = await prisma.brandFollow.findMany({
      where,
    });

    return res.status(200).json(
      brandFollows.map((brandFollow) => ({
        brandId: brandFollow.brandId,
      }))
    );
  }
);
