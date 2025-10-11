import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { DeleteItemResponse } from "./item";

export const deleteItem = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<DeleteItemResponse>> => {
    const { id } = req.params;

    const item = await prisma.item.delete({
      where: { id },
    });

    const response: DeleteItemResponse = {
      status: "success",
      message: "Item deleted successfully",
      data: item,
    };

    return res.status(200).json(response);
  }
);
