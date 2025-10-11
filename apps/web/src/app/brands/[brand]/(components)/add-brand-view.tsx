"use client";

import { useGetGuest, useGetUser } from "@/lib/use-auth";
import { postBrandView } from "@/api/brand-views";
import { useEffect } from "react";

export function AddBrandView({ brand }: { brand: string }) {
  const user = useGetUser();
  const guest = useGetGuest();

  useEffect(() => {
    if (user && brand) {
      postBrandView(
        { type: "user", brandName: brand, userId: user.userId },
        false,
      );
    } else if (guest && brand) {
      postBrandView(
        { type: "guest", brandName: brand, guestUserId: guest.guestUserId },
        false,
      );
    }
  }, [user, guest, brand]);
  return null;
}
