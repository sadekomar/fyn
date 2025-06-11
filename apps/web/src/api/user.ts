import { clientHttp } from "@/lib/queries/http.service";
import {
  CreateUserRequest,
  CreateUserResponse,
  ReadUserCheckoutResponse,
  ReadUserFullResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from "./types/user-types";
import { DeleteUserResponse } from "./types/user-types";
import { Endpoints } from "@/api/endpoints";

export const postUser = async (user: CreateUserRequest) => {
  return clientHttp.post<CreateUserRequest, CreateUserResponse>(
    Endpoints.User,
    user,
  );
};

export const getUser = async (id: string | undefined) => {
  if (!id) {
    return null;
  }

  return clientHttp.get<ReadUserFullResponse>(
    Endpoints.UserById.replace(":id", id),
  );
};

export const getUserCheckout = async (id: string | undefined) => {
  if (!id) {
    return null;
  }

  return clientHttp.get<ReadUserCheckoutResponse>(
    Endpoints.UserCheckoutById.replace(":id", id),
  );
};

export const putUser = async (id: string, user: UpdateUserRequest) => {
  return clientHttp.put<UpdateUserRequest, UpdateUserResponse>(
    Endpoints.UserById.replace(":id", id),
    user,
  );
};

export const deleteUser = async (id: string): Promise<DeleteUserResponse> => {
  return clientHttp.delete<DeleteUserResponse>(
    Endpoints.UserById.replace(":id", id),
  );
};
