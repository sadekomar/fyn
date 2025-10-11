"use client";

import { UpdateUserRequest, UpdateUserResponse } from "@/api/types/user-types";
import { onboardUser } from "@/lib/auth";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { clientHttp } from "@/lib/queries/http.service";
import { useGetUserData } from "../account/(utils)/use-user";

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      // .regex(/[A-Z]/, {
      //   message: "Password must contain at least one uppercase letter",
      // })
      // .regex(/\d/, { message: "Password must contain at least one number" })
      // .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      //   message: "Password must contain at least one special character",
      // })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type PasswordFormSchema = z.infer<typeof passwordSchema>;

export default function Onboarding() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      return onboardUser(userId as string);
    },
  });

  const form = useForm<PasswordFormSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: createPassword } = useMutation({
    mutationFn: (password: string) => {
      return clientHttp.put<UpdateUserRequest, UpdateUserResponse>(
        `/user/${userId}`,
        {
          password,
        },
      );
    },
  });

  const steps = [
    {
      content: (
        <div className="text-left">
          <h2 className="mb-4 text-center text-2xl font-bold">
            Hi, {user?.firstName || "there"}!
          </h2>
          <p className="mb-6 text-gray-600">
            We're excited to have you join our fashion community.
          </p>
          <p className="mb-6 text-gray-600">{user?.customMessage}</p>
          <p className="text-gray-600">
            {user?.isPasswordReset
              ? "Your account is ready to use."
              : "Let's get you set up with a secure password to protect your account."}
          </p>
        </div>
      ),
    },
    {
      content: (
        <div>
          <h2 className="mb-4 text-center text-2xl font-bold">
            Create your password
          </h2>
          <p className="mb-6 text-center text-gray-600">
            Choose a strong password to keep your account secure.
          </p>

          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeIcon className="h-4 w-4" />
                          ) : (
                            <EyeOffIcon className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeIcon className="h-4 w-4" />
                          ) : (
                            <EyeOffIcon className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          {/* <div className="mt-6 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
            <p className="mb-2 font-medium">Password requirements:</p>
            <ul className="space-y-1">
              <li>• At least 8 characters long</li>
              <li>• Contains at least one uppercase letter</li>
              <li>• Contains at least one number</li>
              <li>• Contains at least one special character</li>
            </ul>
          </div> */}
        </div>
      ),
    },
    {
      content: (
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">
            You're all set, {user?.firstName}!
          </h2>
          <p className="mb-6 text-gray-600">
            Your account is now secure and ready to use.
          </p>
          <p className="mb-8 text-gray-600">
            Start exploring and discover amazing fashion pieces just for you.
          </p>
          <Link href="/">
            <Button className="w-full">Explore Loom</Button>
          </Link>
        </div>
      ),
    },
  ];

  // Filter steps based on user.isPasswordReset flag
  const activeSteps = user?.isPasswordReset ? [steps[0], steps[2]] : steps;

  const nextStep = async () => {
    if (currentStep === 1 && !user?.isPasswordReset) {
      const isValid = await form.trigger();
      if (!isValid) {
        return;
      }
      createPassword(form.getValues("password"));
    }

    if (currentStep < activeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="mx-auto h-6 w-48 animate-pulse rounded bg-gray-200"></div>
            <div className="mx-auto h-4 w-64 animate-pulse rounded bg-gray-200"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4 text-center">
              <div className="mx-auto h-8 w-56 animate-pulse rounded bg-gray-200"></div>
              <div className="mx-auto h-4 w-80 animate-pulse rounded bg-gray-200"></div>
              <div className="mx-auto h-4 w-72 animate-pulse rounded bg-gray-200"></div>
              <div className="mx-auto h-4 w-64 animate-pulse rounded bg-gray-200"></div>
            </div>

            <div className="flex justify-between pt-4">
              <div className="h-10 w-20 animate-pulse rounded bg-gray-200"></div>
              <div className="h-10 w-24 animate-pulse rounded bg-gray-200"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center">Oops!</CardTitle>
            <CardDescription className="text-center">
              We couldn't find your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login">
              <Button className="w-full">Go to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-4">
          {activeSteps[currentStep].content}

          <div className="flex justify-between pt-4">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant={currentStep === 0 ? "secondary" : "outline"}
              className={
                currentStep === 0 ? "cursor-not-allowed opacity-50" : ""
              }
            >
              Previous
            </Button>

            {currentStep < activeSteps.length - 1 ? (
              <Button onClick={nextStep}>
                {currentStep === 1 && !user?.isPasswordReset
                  ? "Create Password"
                  : "Next"}
              </Button>
            ) : (
              <Link href="/">
                <Button>Get Started</Button>
              </Link>
            )}
          </div>

          {currentStep < activeSteps.length - 1 && (
            <div className="text-center">
              <Link
                href="/"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Skip onboarding
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
