import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import { z } from "zod";
import bcrypt from "bcrypt";
import prisma from "../../helpers/prisma";
import { CreateUserRequest, CreateUserResponse } from "./user";
import { Resend } from "resend";
import { getEmailConfirmationHtml } from "../../helpers/html-emails";
import { confirmFromAddress } from "../../helpers/email";
import { randomUUID } from "crypto";

const createUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" }),
  username: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

function generateUsername(email: string): string {
  const baseUsername = email.split("@")[0];
  const randomSuffix = Math.random().toString(36).substring(2, 6);
  return `${baseUsername}_${randomSuffix}`;
}

export const createUser = handleExceptions(
  async (
    req: Request<{}, any, CreateUserRequest>,
    res: Response<CreateUserResponse>
  ) => {
    const result = createUserSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        status: "error",
        error: result.error.flatten().fieldErrors,
      });
    }

    const { email, password, phoneNumber, username, firstName, lastName } =
      result.data;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      const existingUserByEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUserByEmail) {
        return res.status(400).json({
          status: "error",
          error: {
            email: ["Email already taken"],
          },
        });
      }

      const existingUserByUsername = await prisma.user.findUnique({
        where: { username },
      });
      if (existingUserByUsername) {
        return res.status(400).json({
          status: "error",
          error: {
            username: ["Username already taken"],
          },
        });
      }

      const token = randomUUID();
      const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          username: username ?? generateUsername(email),
          firstName,
          lastName,
          phoneNumber,
          confirmationToken: token,
          tokenExpiresAt: expires,
        },
      });

      await sendUserConfirmationEmail(user);

      console.log("user in api", user);

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
          root: ["Internal server error"],
        },
      });
    }
  }
);

async function sendUserConfirmationEmail(user: {
  email: string;
  password: string;
  phoneNumber: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  id: string;
  isEmailConfirmed: boolean;
  confirmationToken: string | null;
  tokenExpiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const html = getEmailConfirmationHtml(
    user.firstName ?? "Loomer",
    user.confirmationToken!
  );
  await resend.emails.send({
    from: confirmFromAddress,
    to: user.email,
    subject: "Confirm your email",
    html,
  });
}
