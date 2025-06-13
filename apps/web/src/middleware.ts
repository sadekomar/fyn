import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

const protectedRoutes = ["/orders", "/settings", "/please-confirm", "/account"];

const publicRoutes = ["/login", "/sign-up"];

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  const cookieStore = await cookies();
  const cookie = cookieStore.get("loom-session")?.value;
  const session = cookie ? await decrypt(cookie) : null;
  console.log("session", session);

  // if user isn't logged in don't show them protected routes
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // if the user is logged in, don't show them login and signup pages
  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}
