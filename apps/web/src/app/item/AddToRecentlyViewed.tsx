"use client";
import { useEffect } from "react";
import { useGetSession } from "@/lib/use-auth";
import { postItemView } from "@/api/item-views";

export function AddToRecentlyViewed({ id }: { id: string }) {
  const session = useGetSession();

  useEffect(() => {
    if (session && id) {
      postItemView({ itemId: id, userId: session.userId }, false);
    }
  }, [id, session]);
  return null;
}
