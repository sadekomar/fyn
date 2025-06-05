"use server";

import { createSession, deleteSession, getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { serverHttp } from "./queries/http.service";
import { Endpoints } from "./endpoints";
import { LoginResponse } from "./types";
import { LoginFormSchema } from "@/app/(auth)/login/page";
import { RegisterFormSchema } from "@/app/(auth)/sign-up/page";

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

type RegisterRequest = RegisterFormSchema;
type RegisterResponse = {
  status: "success" | "error";
  error?: {
    root: string[];
  };
};

export async function register(
  data: RegisterFormSchema,
): Promise<RegisterResponse> {
  const { email, password, username, phoneNumber } = data;

  const response = await serverHttp.post<RegisterRequest, RegisterResponse>(
    Endpoints.Register,
    { email, password, username, phoneNumber },
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

  redirect(`/please-confirm?email=${encodeURIComponent(email)}`);
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function getSessionAction() {
  const session = await getSession();
  return session;
}
