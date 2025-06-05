import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import { User } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";
import prisma from "../../helpers/prisma";

type CreateUserRequest = {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

const createUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export const createUser = handleExceptions(
  async (req: Request, res: Response): Promise<Response<User>> => {
    const result = createUserSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        status: "error",
        error: result.error.flatten().fieldErrors,
      });
    }

    const { email, password, username, firstName, lastName, phoneNumber } =
      result.data;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

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
          phoneNumber: phoneNumber || "",
        },
      });

      return res.status(201).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);
