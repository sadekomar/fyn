import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { Resend } from "resend";
import { getApplicationConfirmationHtml } from "../../helpers/html-emails";
import { careersFromAddress } from "../../helpers/email";
import { CreateApplicantRequest, CreateApplicantResponse } from "./applicant";
import { z } from "zod";

const createApplicantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  whyYou: z.string().min(1, "Why you want to work with us is required"),
  whyLoom: z.string().min(1, "Why you want to work with us is required"),
});

export const createApplicant = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<CreateApplicantResponse>> => {
    const result = createApplicantSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: "error",
        error: result.error.flatten().fieldErrors,
      });
    }

    const { name, email, phone, whyYou, whyLoom }: CreateApplicantRequest =
      result.data;

    const applicant = await prisma.applicant.create({
      data: { name, email, phone, whyYou, whyLoom },
    });

    await sendConfirmationEmail(email, name);

    return res.status(201).json(applicant);
  }
);

async function sendConfirmationEmail(email: string, name: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = getApplicationConfirmationHtml(name);

  await resend.emails.send({
    from: careersFromAddress,
    to: email,
    subject: "Loom application confirmation",
    html,
  });
}
