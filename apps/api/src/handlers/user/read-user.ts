import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import { User } from "@prisma/client";
import prisma from "../../helpers/prisma";

export const readUser = handleExceptions(
  async (req: Request, res: Response): Promise<Response<User>> => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  }
);
