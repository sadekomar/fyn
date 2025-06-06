import { User } from "@prisma/client";

// Create
export type CreateUserRequest = {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
};

type CreateUserSuccessResponse = {
  status: "success";
  message: string;
  data: User;
};

type CreateUserErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type CreateUserResponse =
  | CreateUserSuccessResponse
  | CreateUserErrorResponse;

// Read
type ReadUserSuccessResponse = {
  status: "success";
  message: string;
  data: User;
};

type ReadUserErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type ReadUserResponse = ReadUserSuccessResponse | ReadUserErrorResponse;

// Update
export type UpdateUserRequest = {
  email?: string;
  password?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
};

type UpdateUserSuccessResponse = {
  status: "success";
  message: string;
  data: User;
};

type UpdateUserErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type UpdateUserResponse =
  | UpdateUserSuccessResponse
  | UpdateUserErrorResponse;

// Delete
type DeleteUserSuccessResponse = {
  status: "success";
  message: string;
  data: User;
};

type DeleteUserErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type DeleteUserResponse =
  | DeleteUserSuccessResponse
  | DeleteUserErrorResponse;
