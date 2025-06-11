// @ts-nocheck
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoomImage } from "@/components/LoomImage";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { clientHttp } from "@/lib/queries/http.service";
import { Endpoints } from "@/api/endpoints";
import { AuthResponse } from "@/lib/types";

export default function ConfirmEmailPage() {
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const handleResendEmail = async () => {
    setIsResending(true);
    setResendMessage("");

    try {
      const response = await clientHttp.post<AuthResponse>(
        Endpoints.ResendVerificationEmail,
        { email },
      );
      console.log("response", response);

      if (response && response.status === "success") {
        setResendMessage("Verification email has been resent!");
      } else {
        setResendMessage(
          "Failed to resend verification email. Please try again.",
        );
      }
    } catch (error) {
      setResendMessage("An error occurred. Please try again later.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="mb-4 flex justify-center">
            <LoomImage
              src={"/branding/loom-black.png"}
              className="h-8"
              alt="Loom logo"
            />
          </div>
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-blue-100 p-3">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl">
            Check your email
          </CardTitle>
          <CardDescription className="text-center">
            {email ? (
              <>
                We've sent a verification email to{" "}
                <span className="font-medium">{email}</span>
              </>
            ) : (
              "We've sent a verification email to your address"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-gray-600">
            <p>
              Please check your inbox and click on the verification link to
              complete your registration.
            </p>
            <p className="mt-2">
              If you don't see the email, check your spam folder.
            </p>
          </div>

          <div className="pt-2">
            <Button
              className="w-full"
              variant="outline"
              onClick={handleResendEmail}
              disabled={isResending}
            >
              {isResending ? "Sending..." : "Resend verification email"}
            </Button>

            {resendMessage && (
              <p
                className={`mt-2 text-center text-sm ${resendMessage.includes("Failed") || resendMessage.includes("error") ? "text-red-500" : "text-green-500"}`}
              >
                {resendMessage}
              </p>
            )}
          </div>

          <div className="mt-4 text-center text-sm">
            <a href="/login" className="text-blue-600 hover:underline">
              Back to login
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
