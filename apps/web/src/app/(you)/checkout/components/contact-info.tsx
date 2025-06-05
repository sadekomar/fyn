import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormControl, FormField } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { CheckoutFormSchema } from "../checkout-form";
import { useGetSession } from "@/lib/use-auth";
import { useQuery } from "@tanstack/react-query";
import { clientHttp } from "@/lib/queries/http.service";

type User = {
  id: string;
  email: string;
  password: string;
  phoneNumber: string;
  username: string;
  isEmailConfirmed: boolean;
  firstName: string | null;
  lastName: string | null;
  confirmationToken: string | null;
  tokenExpiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export function ContactInfo({
  loggedIn,
  form,
}: {
  loggedIn: boolean;
  form: UseFormReturn<CheckoutFormSchema>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-medium">
            1
          </div>
          Contact information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loggedIn ? (
          <LoggedInContactInfo form={form} />
        ) : (
          <GuestContactInfo form={form} />
        )}
      </CardContent>
    </Card>
  );
}

function LoggedInContactInfo({
  form,
}: {
  form: UseFormReturn<CheckoutFormSchema>;
}) {
  const [useAccountContactInfo, setUseAccountContactInfo] =
    useState<boolean>(true);

  const session = useGetSession();
  const { data: user } = useQuery({
    queryKey: ["user", session?.userId],
    queryFn: () => clientHttp.get<User>(`/user/${session?.userId}`),
    enabled: session !== null,
  });

  useEffect(() => {
    if (useAccountContactInfo && user) {
      form.setValue("email", user.email);
      form.setValue("phoneNumber", user.phoneNumber);
    }
  }, [useAccountContactInfo, user, form]);

  return (
    <>
      <div className="flex items-center space-x-2 mb-4 cursor-pointer">
        <Checkbox
          id="useAccountContactInfo"
          checked={useAccountContactInfo}
          onCheckedChange={() => setUseAccountContactInfo((prev) => !prev)}
        />
        <Label htmlFor="useAccountContactInfo" className="cursor-pointer">
          Use my account contact information
        </Label>
      </div>
      {!useAccountContactInfo && (
        <>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </>
  );
}

function GuestContactInfo({
  form,
}: {
  form: UseFormReturn<CheckoutFormSchema>;
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Create a password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...field}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone number</FormLabel>
            <FormControl>
              <Input type="tel" placeholder="Phone number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
