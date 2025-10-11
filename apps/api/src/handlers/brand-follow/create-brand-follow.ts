import prisma from "../../helpers/prisma";
import { handleExceptions } from "../../helpers/utils";
import { Request, Response } from "express";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import {
  CreateBrandFollowRequest,
  CreateBrandFollowResponse,
} from "./brand-follow";

const CreateBrandFollowRequestSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("user"),
    brandId: z.string(),
    userId: z.string(),
  }),
  z.object({
    type: z.literal("guest"),
    brandId: z.string(),
    guestUserId: z.string(),
  }),
]);

export const createBrandFollow = handleExceptions(
  async (
    req: Request<{}, {}, CreateBrandFollowRequest>,
    res: Response<CreateBrandFollowResponse>
  ) => {
    const parsedBody = CreateBrandFollowRequestSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        status: "error",
        error: {
          root: ["Invalid request body"],
        },
      });
    }

    let data: {
      brandId: string;
      userId?: string;
      guestUserId?: string;
    } = { brandId: parsedBody.data.brandId };
    let where: Prisma.BrandFollowWhereUniqueInput;
    if (parsedBody.data.type === "user") {
      where = {
        userId_brandId: {
          userId: parsedBody.data.userId,
          brandId: parsedBody.data.brandId,
        },
      };
      data = {
        ...data,
        userId: parsedBody.data.userId,
      };
    } else {
      where = {
        guestUserId_brandId: {
          guestUserId: parsedBody.data.guestUserId,
          brandId: parsedBody.data.brandId,
        },
      };
      data = {
        ...data,
        guestUserId: parsedBody.data.guestUserId,
      };
    }

    const existingBrandFollow = await prisma.brandFollow.findUnique({
      where,
    });

    if (existingBrandFollow) {
      await prisma.brandFollow.delete({
        where,
      });
      return res.status(200).json({
        status: "success",
        message: "Brand unfollowed successfully",
      });
    } else {
      await prisma.brandFollow.create({
        data,
      });
      return res.status(201).json({
        status: "success",
        message: "Brand followed successfully",
      });
    }
  }
);
