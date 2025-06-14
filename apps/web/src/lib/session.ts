import "server-only";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

// Get the secret key from environment variables
const secretKey = process.env.SECRET_KEY;

// Validate that the secret key exists
if (!secretKey) {
  throw new Error("SECRET_KEY environment variable is not set");
}

// Encode the secret key for JWT signing
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: string) {
  try {
    const session = await encrypt({
      userId,
      expiresAt: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    });

    (await cookies()).set("loom-session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 21 * 24 * 60 * 60,
    });
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("loom-session");
}

export async function getSession(): Promise<{
  userId: string;
  expiresAt: Date;
} | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("loom-session")?.value;
  const session = cookie ? await decrypt(cookie) : null;
  return session
    ? {
        userId: session.userId as string,
        expiresAt: new Date(session.expiresAt as number),
      }
    : null;
}

type Payload = {
  userId: string;
  expiresAt: Date;
};

function encrypt(payload: Payload) {
  try {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("21d")
      .setIssuedAt()
      .sign(encodedKey);
  } catch (error) {
    console.error("Error encrypting payload:", error);
    throw error;
  }
}

export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session", error);
    return null;
  }
}
