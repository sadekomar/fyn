import { Request, Response } from "express";
import prisma from "../../helpers/prisma";
import { handleExceptions } from "../../helpers/utils";
import { User } from "@prisma/client";
import { DeleteUserResponse } from "./user-types";

export const deleteUser = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<DeleteUserResponse>> => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await prisma.user.delete({
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

    return res.status(200).json({
      status: "success",
      message: "User deleted successfully",
      data: user,
    });
  }
);
