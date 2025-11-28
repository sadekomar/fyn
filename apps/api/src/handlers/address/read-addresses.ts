import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import { Address, prisma } from "@repo/database";

export const readAddress = handleExceptions(
  async (req: Request, res: Response): Promise<Response<Address>> => {
    const { userId } = req.params;

    const addresses = await prisma.address.findMany({
      where: { userId: userId },
    });

    if (!addresses) {
      return res.status(404).json({ error: "Addresses not found" });
    }

    return res.status(200).json(addresses);
  }
);
