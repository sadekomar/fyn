import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { ReadApplicantResponse } from "./applicant-types";

export const readApplicant = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<ReadApplicantResponse>> => {
    const { id } = req.params;

    const applicant = await prisma.applicant.findUnique({
      where: { id },
    });

    if (!applicant) {
      return res.status(404).json({
        status: "error",
        error: {
          message: ["Applicant not found"],
        },
      });
    }

    const response: ReadApplicantResponse = {
      status: "success",
      message: "Applicant fetched successfully",
      data: applicant,
    };

    return res.status(200).json(response);
  }
);
