"use server";

import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { HttpMethods, httpService } from "./queries/http.service";
import { Endpoints } from "./endpoints";
import { AuthResponse } from "./types";
import { LoginFormI } from "@/app/(auth)/login/page";
import { RegisterFormI } from "@/app/(auth)/sign-up/page";

export async function login(data: LoginFormI): Promise<AuthResponse> {
  const { email, password } = data;

  const response = await httpService<AuthResponse>(
    HttpMethods.POST,
    Endpoints.Login,
    {
      data: { email, password },
      isDataJson: true,
      isResponseJson: true,
      isServer: true,
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
    redirect("/please-confirm");
  }

  redirect("/");
}

export async function register(data: RegisterFormI): Promise<AuthResponse> {
  const { email, password, username } = data;

  const response = await httpService<AuthResponse>(
    HttpMethods.POST,
    Endpoints.Register,
    {
      data: { email, password, username },
      isDataJson: true,
      isResponseJson: true,
      isServer: true,
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

  redirect(`/please-confirm?email=${encodeURIComponent(email)}`);
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
