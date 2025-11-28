import { handleExceptions } from "../../helpers/utils";
import { Request, Response } from "express";
import { prisma } from "@repo/database";
import { z } from "zod";
import bcrypt from "bcrypt";
import { UpdateUserRequest, UpdateUserResponse } from "./user";

const updateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().optional(),
  username: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export const updateUser = handleExceptions(
  async (req: Request, res: Response<UpdateUserResponse>) => {
    const { id } = req.params;
    const result = updateUserSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        status: "error",
        error: result.error.flatten().fieldErrors,
      });
    }

    const {
      email,
      password,
      username,
      firstName,
      lastName,
      phoneNumber,
    }: UpdateUserRequest = result.data;

    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return res.status(404).json({
        status: "error",
        error: {
          message: ["User not found"],
        },
      });
    }

    const saltRounds = 10;
    const hashedPassword = password
      ? await bcrypt.hash(password, saltRounds)
      : undefined;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        email,
        password: hashedPassword,
        username,
        firstName,
        lastName,
        phoneNumber,
        isPasswordReset: password ? true : false,
      },
    });

    return res.status(200).json({
      status: "success",
      data: updatedUser,
      message: "User updated successfully",
    });
  }
);
