import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";

import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormControl, FormField } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { egyptianGovernorates } from "../(utlis)/governorates";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { OrderFormSchema } from "../checkout-form";

export const billingAddressSchema = z
  .object({
    country: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    address: z.string().optional(),
    apartment: z.string().optional(),
    city: z.string().optional(),
    governorate: z.string().optional(),
    postalCode: z.string().optional(),
  })
  .nullable()
  .optional();

export function BillingAddress({
  form,
}: {
  form: UseFormReturn<OrderFormSchema>;
}) {
  const [sameAsShipping, setSameAsShipping] = useState<boolean>(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-sm font-medium text-white">
            3
          </div>
          Billing address
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex cursor-pointer items-center space-x-2">
          <Checkbox
            id="sameAsShipping"
            checked={sameAsShipping}
            onCheckedChange={() => setSameAsShipping((prev) => !prev)}
          />
          <Label htmlFor="sameAsShipping" className="cursor-pointer">
            Same as shipping address
          </Label>
        </div>
        {!sameAsShipping && <BillingAddressForm form={form} />}
      </CardContent>
    </Card>
  );
}

export function BillingAddressForm({
  form,
}: {
  form: UseFormReturn<OrderFormSchema>;
}) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="billingAddress.country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Egypt">Egypt</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="billingAddress.firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="billingAddress.lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="billingAddress.address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input placeholder="Address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="billingAddress.apartment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Apartment <span className="text-gray-500">(optional)</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Apartment, suite, etc." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="billingAddress.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="billingAddress.governorate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Governorate</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Governorate" />
                  </SelectTrigger>
                  <SelectContent>
                    {egyptianGovernorates?.map((governorate) => (
                      <SelectItem
                        key={governorate.value}
                        value={governorate.value}
                      >
                        {governorate.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="billingAddress.postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input placeholder="Postal Code" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
