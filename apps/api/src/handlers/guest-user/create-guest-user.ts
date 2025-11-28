import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import { prisma } from "@repo/database";
import { CreateGuestUserRequest, CreateGuestUserResponse } from "./guest-user";

export const createGuestUser = handleExceptions(
  async (
    req: Request<{}, any, CreateGuestUserRequest>,
    res: Response<CreateGuestUserResponse>
  ) => {
    const guestUser = await prisma.guestUser.create({ data: {} });

    console.log("guestUser", guestUser);

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: guestUser,
    });
  }
);
