import { useEffect } from "react";
import { useState } from "react";
import { getSessionAction } from "./auth";

export const useGetSession = () => {
  const [session, setSession] = useState<{
    userId: string;
    expiresAt: Date;
  } | null>(null);

  useEffect(() => {
    getSessionAction().then((session) => setSession(session));
  }, []);

  return session;
};
