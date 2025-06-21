"use client";

import { useEffect } from "react";
import { useState } from "react";
import { getUserSession } from "./auth";
import { getGuestSession } from "./guest-session";

export const useGetUser = () => {
  const [session, setSession] = useState<{
    userId: string;
    expiresAt: Date;
  } | null>(null);

  useEffect(() => {
    getUserSession().then((session) => {
      setSession(session);
    });
  }, []);

  return session;
};

// so this is merely used to set the state of the returned variable and await the server action to resolve.
// it's kindof like me creating my own useQuery hook.
// it actually is like my own react query hahahah.
export const useGetGuest = () => {
  const [session, setSession] = useState<{
    guestUserId: string;
    expiresAt: Date;
  } | null>(null);

  useEffect(() => {
    getGuestSession().then((guestSession) => {
      setSession(guestSession);
    });
  }, []);

  return session;
};

export function useGetCurrentUser() {
  const user = useGetUser();
  const guest = useGetGuest();
  console.log("user", user);
  console.log("guest", guest);
  const type = user ? "user" : "guest";
  const id = user ? user.userId : guest?.guestUserId;
  return { id, type } as const;
}
