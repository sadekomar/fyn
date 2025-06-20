import { serverHttp } from "@/lib/queries/http.service";
import { ItemCardsI } from "@/lib/types";
import { getCookie } from "./cookies.utils";
import { Endpoints } from "@/api/endpoints";

/**
 * Get the query string for the ID based on if the user is logged in or not.
 * @returns The query string for the ID
 */
export const getIdQuery = (id: string, type: "user" | "guest") => {
  if (type === "user") {
    return `userId=${id}`;
  }
  return `guestUserId=${id}`;
};

/**
 * Get the request body for the ID based on if the user is logged in or not.
 * @returns The request body for the ID
 */
export const getIdBody = (id: string, type: "user" | "guest") => {
  if (type === "user") {
    return { userId: id };
  }
  return { guestUserId: id };
};

export function getQueryString(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  const queryParams = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => queryParams.append(key, v));
    } else if (value) {
      queryParams.append(key, value);
    }
  });
  const queryString = queryParams.toString();
  return queryString;
}

// i guess i need an array of objects.
// each object has a key and a value.

export function getQueryStringArray(searchParams: {
  [key: string]: string | string[] | undefined;
}): [string, string][] {
  const queryParams = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => queryParams.append(key, v));
    } else if (value) {
      queryParams.append(key, value);
    }
  });
  const queryString = Array.from(queryParams.entries());
  return queryString;
}

export async function getRecentlyViewed() {
  const recentlyViewed = (await getCookie("recently-viewed")).reverse();
  return await serverHttp.post<{ ids: string[] }, ItemCardsI[]>(
    Endpoints.ItemsByIds,
    { ids: recentlyViewed },
  );
}
