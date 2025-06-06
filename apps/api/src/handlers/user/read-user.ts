import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { ReadUserResponse } from "./user-types";

export const readUser = handleExceptions(
  async (req: Request, res: Response): Promise<Response<ReadUserResponse>> => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        itemViews: true,
        categoryViews: true,
        brandViews: true,
        likes: true,
        itemCarts: true,
        orders: true,
        addresses: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const response: ReadUserResponse = {
      status: "success",
      message: "User fetched successfully",
      data: user,
    };

    return res.status(200).json(response);
  }
);
