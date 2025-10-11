import { Request, Response } from "express";
import prisma from "../../helpers/prisma";
import { Newsletter } from "@prisma/client";
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
