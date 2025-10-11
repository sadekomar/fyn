"use client";

import { Endpoints } from "@/api/endpoints";
import { clientHttp } from "@/lib/queries/http.service";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ConfirmEmailSuccessResponse = {
  status: "success";
  message: string;
};

type ConfirmEmailErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

type ConfirmEmailResponse =
  | ConfirmEmailSuccessResponse
  | ConfirmEmailErrorResponse;

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { data: response } = useQuery({
    queryKey: ["confirm-email", token],
    queryFn: () =>
      clientHttp.get<ConfirmEmailResponse>(
        `${Endpoints.ConfirmEmail}?token=${token}`,
      ),
  });
  const router = useRouter();

  useEffect(() => {
    if (response && response.status === "success") {
      router.push("/");
    }
  }, [response, router]);

  if (response?.status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative flex size-16">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex size-16 items-center justify-center rounded-full bg-red-500">
                <AlertCircle className="h-8 w-8 text-white" />
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Verification failed
            </h2>
            <div className="space-y-3 text-left">
              <p className="text-gray-600">
                We couldn't verify your email address. This could be because:
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                  The verification link has expired
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                  The link has already been used
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                  The link is invalid
                </li>
              </ul>
            </div>
            <Link
              href="/"
              className="mt-4 rounded-md bg-[#a6a2de] px-4 py-2 text-sm font-medium text-white hover:bg-[#a6a2de]/80 focus:ring-2 focus:ring-[#a6a2de] focus:ring-offset-2 focus:outline-none"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative flex size-16">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex size-16 items-center justify-center rounded-full bg-blue-500">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Verifying Your Email
          </h2>
          <p className="text-center text-gray-600">
            Please wait while we confirm your email address. This may take a few
            moments.
          </p>
        </div>
      </div>
    </div>
  );
}
