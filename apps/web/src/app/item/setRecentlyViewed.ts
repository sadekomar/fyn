"use server";
import { setValueInCookie } from "@/app/(utils)/cookies.utils";

export async function setRecentlyViewed(id: string) {
  await setValueInCookie("recently-viewed", id);
}
