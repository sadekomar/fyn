import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";

export const deleteItem = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<{ status: string }>> => {
    const { id } = req.params;

    const item = await prisma.item.delete({
      where: { id },
    });

    return res.status(200).json({
      status: "success",
      message: "Item deleted successfully",
      data: item,
    });
  }
);
