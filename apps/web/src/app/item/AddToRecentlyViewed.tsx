"use client";
import { useEffect } from "react";
import { setRecentlyViewed } from "./setRecentlyViewed";

export function AddToRecentlyViewed({ id }: { id: string }) {
  useEffect(() => {
    setRecentlyViewed(id);
  }, [id]);
  return null;
}
