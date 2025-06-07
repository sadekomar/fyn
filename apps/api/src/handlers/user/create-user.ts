import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import { User } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";
import prisma from "../../helpers/prisma";
import { CreateUserRequest, CreateUserResponse } from "./user-types";

const createUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const createUser = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<CreateUserResponse>> => {
    const result = createUserSchema.safeParse(req.body);

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
    }: CreateUserRequest = result.data;

    const saltRounds = 10;
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);

    try {
      const existingUserByEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUserByEmail) {
        return res.status(400).json({ error: "Email already in use" });
      }

      const existingUserByUsername = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUserByUsername) {
        return res.status(400).json({ error: "Username already in use" });
      }

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          username,
          firstName,
          lastName,
          phoneNumber: phoneNumber,
        },
      });

      return res.status(201).json({
        status: "success",
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        error: {
          root: "Internal server error",
        },
      }) as Response<CreateUserResponse>;
    }
  }
);
