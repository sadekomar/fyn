"use server";

import { serverHttp } from "./queries/http.service";
import { createSession, deleteSession, getSession } from "./session";
import { Endpoints } from "@/api/endpoints";
import {
  CreateGuestUserRequest,
  CreateGuestUserResponse,
} from "@/api/types/guest-user-types";

export async function createGuestSession() {
  if (await getSession("loom-session")) {
    return;
  }

  let session;
  session = await getSession("guest-session");

  if (!session) {
    const response = await serverHttp.post<
      CreateGuestUserRequest,
      CreateGuestUserResponse
    >(Endpoints.GuestUser, {});
    if (response.status === "success") {
      session = await createSession(response.data.id, "guest-session");
    } else if (response.status === "error") {
      throw new Error(response.error.root[0]);
    } else {
      throw new Error("Unknown error");
    }
  }

  return session;
}

export async function deleteGuestSession() {
  await deleteSession("guest-session");
}

export async function getGuestSession(): Promise<{
  guestUserId: string;
  expiresAt: Date;
} | null> {
  const session = await getSession("guest-session");
  return session
    ? { guestUserId: session.userId as string, expiresAt: session.expiresAt }
    : null;
}
