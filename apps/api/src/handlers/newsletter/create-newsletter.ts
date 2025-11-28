import { Request, Response } from "express";
import { prisma, Newsletter } from "@repo/database";
import { handleExceptions } from "../../helpers/utils";

export const createNewsletter = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<{ status: string; data: Newsletter }>> => {
    const { email, type } = req.body;

    const newsletter = await prisma.newsletter.create({
      data: { email, type },
    });

    return res.status(201).json({
      status: "success",
      data: newsletter,
    });
  }
);
