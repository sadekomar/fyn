import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import {
  UpdateApplicantRequest,
  UpdateApplicantResponse,
} from "./applicant-types";
import { z } from "zod";

const updateApplicantSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().min(1, "Phone is required").optional(),
  whyYou: z
    .string()
    .min(1, "Why you want to work with us is required")
    .optional(),
  whyLoom: z
    .string()
    .min(1, "Why you want to work with us is required")
    .optional(),
});

export const updateApplicant = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<UpdateApplicantResponse>> => {
    const { id } = req.params;
    const result = updateApplicantSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        status: "error",
        error: result.error.flatten().fieldErrors,
      });
    }

    const updateData: UpdateApplicantRequest = result.data;

    const applicant = await prisma.applicant.update({
      where: { id },
      data: updateData,
    });

    const response: UpdateApplicantResponse = {
      status: "success",
      message: "Applicant updated successfully",
      data: applicant,
    };

    return res.status(200).json(response);
  }
);
