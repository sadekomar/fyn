"use server";

import { createSession, deleteSession, getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { serverHttp } from "./queries/http.service";
import { Endpoints } from "../api/endpoints";
import { LoginResponse } from "./types";
import { LoginFormSchema } from "@/app/(auth)/login/page";
import { RegisterFormSchema } from "@/app/(auth)/sign-up/page";
import { CreateUserRequest, CreateUserResponse } from "@/api/types/user-types";

export async function login(data: LoginFormSchema): Promise<LoginResponse> {
  const { email, password } = data;

  type LoginRequest = LoginFormSchema;
  const response = await serverHttp.post<LoginRequest, LoginResponse>(
    Endpoints.Login,
    {
      email,
      password,
    },
  );

  if (!response) {
    return {
      status: "error",
      error: {
        root: ["An error occurred during login. Please try again."],
      },
    };
  }

  if (response.status === "error") {
    return response;
  }
  await createSession(response.data.userId);

  if (!response.data.isEmailConfirmed) {
    redirect(`/please-confirm?email=${encodeURIComponent(email)}`);
  }

  redirect("/");
}

export async function register(
  data: RegisterFormSchema,
): Promise<CreateUserResponse> {
  const { email, password, phoneNumber, username, firstName, lastName } = data;

  const response = await serverHttp.post<CreateUserRequest, CreateUserResponse>(
    Endpoints.User,
    { email, password, phoneNumber, username, firstName, lastName },
  );

  if (!response) {
    return {
      status: "error",
      error: {
        root: ["An error occurred during login. Please try again."],
      },
    };
  }

  if (response.status === "error") {
    return response;
  }

  await createSession(response.data.id);

  return response;
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function getSessionAction() {
  const session = await getSession();
  return session;
}
