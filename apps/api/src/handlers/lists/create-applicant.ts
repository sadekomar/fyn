import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { Resend } from "resend";
import { getApplicationConfirmationHtml } from "../../helpers/html-emails";
import { careersFromAddress } from "../../helpers/email";

type CreateApplicantResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  whyYou: string;
  whyLoom: string;
};

export const createApplicant = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<CreateApplicantResponse>> => {
    const { name, email, phone, whyYou, whyLoom } = req.body;

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
