"use client";

import { createGuestSession } from "@/lib/guest-session";
import { useEffect } from "react";

export function GuestSessionProvider() {
  useEffect(() => {
    async function guestCreation() {
      try {
        await createGuestSession();
      } catch (error) {
        console.error("Error creating guest session", error);
      }
    }

    guestCreation();
  }, []);

  return null;
}
