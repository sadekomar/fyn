import { Request, Response } from "express";
import prisma from "../../helpers/prisma";
import { handleExceptions } from "../../helpers/utils";
import { DeleteAddressResponse } from "./address-types";

export const deleteAddress = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<DeleteAddressResponse>> => {
    const { id } = req.params;

    const existingAddress = await prisma.address.findUnique({
      where: { id },
    });
    if (!existingAddress) {
      return res.status(404).json({
        status: "error",
        error: {
          id: ["Address not found"],
        },
      });
    }

    const address = await prisma.address.delete({
      where: { id },
    });

    const response: DeleteAddressResponse = {
      status: "success",
      message: "Address deleted successfully",
      data: address,
    };

    return res.status(200).json(response);
  }
);
