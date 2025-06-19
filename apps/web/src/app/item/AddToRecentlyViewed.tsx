"use client";
import { useEffect } from "react";
import { useGetGuest, useGetUser } from "@/lib/use-auth";
import { postItemView } from "@/api/item-views";

export function AddToRecentlyViewed({ id }: { id: string }) {
  const user = useGetUser();
  const guest = useGetGuest();

  useEffect(() => {
    if (user && id) {
      postItemView({ type: "user", itemId: id, userId: user.userId }, false);
    } else if (guest && id) {
      postItemView(
        { type: "guest", itemId: id, guestUserId: guest.guestUserId },
        false,
      );
    }
  }, [id, user, guest]);
  return null;
}
