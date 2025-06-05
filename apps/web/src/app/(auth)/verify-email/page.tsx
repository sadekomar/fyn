// @ts-nocheck
import { Endpoints } from "@/lib/endpoints";
import { serverHttp } from "@/lib/queries/http.service";
import { AuthResponse } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { token } = await searchParams;

  const response = await serverHttp.get<AuthResponse>(
    `${Endpoints.ConfirmEmail}?token=${token}`,
  );

  if (response.status === "success") {
    redirect("/");
  }

  if (response.status === "error") {
    return <div>Couldn't verify email</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative flex size-10">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a6a2de] opacity-75"></span>
        <span className="relative inline-flex size-10 rounded-full bg-[#a6a2de]"></span>
      </div>
    </div>
  );
}
