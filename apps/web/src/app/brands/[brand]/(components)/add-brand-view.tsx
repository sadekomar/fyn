"use client";

import { useGetSession } from "@/lib/use-auth";
import { postBrandView } from "@/api/brand-views";
import { useEffect } from "react";

export function AddBrandView({ brand }: { brand: string }) {
  const session = useGetSession();

  useEffect(() => {
    if (session && brand) {
      postBrandView({ brandName: brand, userId: session.userId }, false);
    }
  }, [session, brand]);
  return null;
}
