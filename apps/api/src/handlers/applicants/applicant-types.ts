import { Applicant } from "@prisma/client";

// Create
export type CreateApplicantRequest = {
  name: string;
  email: string;
  phone: string;
  whyYou: string;
  whyLoom: string;
};

type CreateApplicantSuccessResponse = {
  status: "success";
  message: string;
  data: Applicant;
};

type CreateApplicantErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type CreateApplicantResponse =
  | CreateApplicantSuccessResponse
  | CreateApplicantErrorResponse;

// Read
type ReadApplicantsSuccessResponse = {
  status: "success";
  message: string;
  data: Applicant[];
};

type ReadApplicantsErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type ReadApplicantsResponse =
  | ReadApplicantsSuccessResponse
  | ReadApplicantsErrorResponse;

// Read Single
type ReadApplicantSuccessResponse = {
  status: "success";
  message: string;
  data: Applicant;
};

type ReadApplicantErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type ReadApplicantResponse =
  | ReadApplicantSuccessResponse
  | ReadApplicantErrorResponse;

// Update
export type UpdateApplicantRequest = Partial<{
  name: string;
  email: string;
  phone: string;
  whyYou: string;
  whyLoom: string;
}>;

type UpdateApplicantSuccessResponse = {
  status: "success";
  message: string;
  data: Applicant;
};

type UpdateApplicantErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type UpdateApplicantResponse =
  | UpdateApplicantSuccessResponse
  | UpdateApplicantErrorResponse;

// Delete
type DeleteApplicantSuccessResponse = {
  status: "success";
  message: string;
  data: Applicant;
};

type DeleteApplicantErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type DeleteApplicantResponse =
  | DeleteApplicantSuccessResponse
  | DeleteApplicantErrorResponse;
