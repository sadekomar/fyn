import { createGuestUser } from "./create-guest-user";

export { createGuestUser };

// Create
export type CreateGuestUserRequest = {};

type CreateGuestUserSuccessResponse = {
  status: "success";
  message: "User created successfully";
  data: {
    id: string;
  };
};

type CreateGuestUserErrorResponse = {
  status: "error";
  error: {
    root: string[];
  };
};

export type CreateGuestUserResponse =
  | CreateGuestUserSuccessResponse
  | CreateGuestUserErrorResponse;
