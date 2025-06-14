"use client";

import { useGetSession } from "@/lib/use-auth";
import { postCategoryView } from "@/api/category-views";
import { useEffect } from "react";

export function AddCategoryView({ category }: { category: string }) {
  const session = useGetSession();

  useEffect(() => {
    if (session && category) {
      postCategoryView(
        { categoryName: category, userId: session.userId },
        false,
      );
    }
  }, [session, category]);
  return null;
}
