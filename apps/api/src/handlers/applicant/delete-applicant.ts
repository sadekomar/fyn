import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import { prisma } from "@repo/database";
import { DeleteApplicantResponse } from "./applicant";

export const deleteApplicant = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<DeleteApplicantResponse>> => {
    const { id } = req.params;

    const applicant = await prisma.applicant.delete({
      where: { id },
    });

    const response: DeleteApplicantResponse = {
      status: "success",
      message: "Applicant deleted successfully",
      data: applicant,
    };

    return res.status(200).json(response);
  }
);
