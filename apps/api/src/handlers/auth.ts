import prisma from "../helpers/prisma";
import { handleExceptions } from "../helpers/utils";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import { Resend } from "resend";
import { getEmailConfirmationHtml } from "../helpers/html-emails";
import { confirmFromAddress } from "../helpers/email";

type LoginSuccessResponse = {
  status: "success";
  message: string;
  data: {
    userId: string;
    isEmailConfirmed: boolean;
  };
};

type LoginErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

type AuthResponse = LoginSuccessResponse | LoginErrorResponse;

export const login = handleExceptions(
  async (req: Request, res: Response): Promise<Response<AuthResponse>> => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        status: "error",
        error: {
          email: ["Invalid email or password. Sign up first."],
        },
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: "error",
        error: {
          password: ["Invalid email or password"],
        },
      });
    }

    if (!user.isEmailConfirmed) {
      const token = crypto.randomUUID();
      const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

      await prisma.user.update({
        where: { id: user.id },
        data: { confirmationToken: token, tokenExpiresAt: expires },
      });

      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: confirmFromAddress,
        to: user.email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${process.env.FRONTEND_URL}/verify-email?token=${token}">here</a> to confirm your email</p>`,
      });

      console.log("Email sent");

      return res.status(200).json({
        status: "success",
        message: "Email sent",
        data: { userId: user.id, isEmailConfirmed: false },
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: { userId: user.id, isEmailConfirmed: user.isEmailConfirmed },
    });
  }
);

const registerSchema = z.object({
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

export const register = handleExceptions(
  async (req: Request, res: Response): Promise<Response<AuthResponse>> => {
    const result = registerSchema.safeParse(req.body);

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
        return res.status(400).json({
          status: "error",
          error: {
            email: ["Email already in use"],
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

      const token = crypto.randomUUID();
      const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          username,
          firstName,
          lastName,
          phoneNumber,
          confirmationToken: token,
          tokenExpiresAt: expires,
        },
      });

      const html = getEmailConfirmationHtml(firstName || "", token);

      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: confirmFromAddress,
        to: email,
        subject: "Confirm your email",
        html,
      });

      return res.status(201).json({
        status: "success",
        message: "User created successfully",
        data: { userId: user.id, isEmailConfirmed: user.isEmailConfirmed },
      });
    } catch (error) {
      // Handle any other unexpected errors
      console.error("Registration error:", error);
      return res.status(500).json({
        status: "error",
        error: {
          password: ["Failed to create user"],
        },
      });
    }
  }
);

export const confirmEmail = handleExceptions(
  async (req: Request, res: Response): Promise<Response<AuthResponse>> => {
    const { token } = req.params;

    const user = await prisma.user.findFirst({
      where: {
        confirmationToken: token as string,
        tokenExpiresAt: { gt: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ status: "error", error: "Invalid token" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailConfirmed: true,
        confirmationToken: null,
        tokenExpiresAt: null,
      },
    });

    return res
      .status(200)
      .json({ status: "success", message: "Email confirmed" });
  }
);

export const resendVerificationEmail = handleExceptions(
  async (req: Request, res: Response): Promise<Response<AuthResponse>> => {
    const { email } = req.body;
    console.log("Resending verification email to", email);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ status: "error", error: "User not found" });
    }

    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: { confirmationToken: token, tokenExpiresAt: expires },
    });

    const resend = new Resend(process.env.RESEND_API_KEY);

    const html = getEmailConfirmationHtml(user.firstName || "", token);
    await resend.emails.send({
      from: confirmFromAddress,
      to: email,
      subject: "Confirm your email",
      html,
    });

    return res.status(200).json({
      status: "success",
      message: "Email sent",
      data: { userId: user.id, isEmailConfirmed: false },
    });
  }
);
