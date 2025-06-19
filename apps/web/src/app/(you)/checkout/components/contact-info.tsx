import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormControl, FormField } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { OrderFormSchema } from "../checkout-form";
import { useGetUser } from "@/lib/use-auth";
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
  isLoggedIn,
  form,
}: {
  isLoggedIn: boolean;
  form: UseFormReturn<OrderFormSchema>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-sm font-medium text-white">
            1
          </div>
          Contact information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoggedIn ? (
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
  form: UseFormReturn<OrderFormSchema>;
}) {
  const [useAccountContactInfo, setUseAccountContactInfo] =
    useState<boolean>(true);

  const session = useGetUser();
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
      <div className="mb-4 flex cursor-pointer items-center space-x-2">
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

function GuestContactInfo({ form }: { form: UseFormReturn<OrderFormSchema> }) {
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
