"use client";

import { useGetGuest, useGetUser } from "@/lib/use-auth";
import { postCategoryView } from "@/api/category-views";
import { useEffect } from "react";

export function AddCategoryView({ category }: { category: string }) {
  const user = useGetUser();
  const guest = useGetGuest();

  useEffect(() => {
    if (user && category) {
      postCategoryView(
        { type: "user", categoryName: category, userId: user.userId },
        false,
      );
    } else if (guest && category) {
      postCategoryView(
        {
          type: "guest",
          categoryName: category,
          guestUserId: guest.guestUserId,
        },
        false,
      );
    }
  }, [user, guest, category]);
  return null;
}
