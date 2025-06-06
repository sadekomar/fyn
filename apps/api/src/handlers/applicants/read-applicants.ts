import { Request, Response } from "express";
import { ReadApplicantsResponse } from "./applicant-types";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";

export const readApplicants = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<ReadApplicantsResponse>> => {
    const applicants = await prisma.applicant.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const response: ReadApplicantsResponse = {
      status: "success",
      message: "Applicants fetched successfully",
      data: applicants,
    };

    return res.status(200).json(response);
  }
);
