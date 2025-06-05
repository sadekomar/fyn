"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormControl, FormField } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { egyptianGovernorates } from "../(utlis)/governorates";
import { z } from "zod";
import { Address, CheckoutFormSchema } from "../checkout-form";
import { useState, useEffect } from "react";

export const addressSchema = z.object({
  country: z.string().min(1, { message: "Country is required" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  apartment: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  governorate: z.string().min(1, { message: "Governorate is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
});

export type AddressFormSchema = z.infer<typeof addressSchema>;

export function ShippingAddress({
  form,
  addresses = [],
}: {
  form: UseFormReturn<CheckoutFormSchema>;
  addresses?: Address[];
}) {
  const [selectedAddress, setSelectedAddress] = useState<string>("new-address");

  // Set initial form values if there are saved addresses
  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddress = addresses[0];
      form.setValue("address", {
        country: defaultAddress.country,
        firstName: defaultAddress.firstName,
        lastName: defaultAddress.lastName,
        address: defaultAddress.address,
        apartment: defaultAddress.apartment ?? "",
        city: defaultAddress.city,
        governorate: defaultAddress.governorate,
        postalCode: defaultAddress.postalCode ?? "",
      });
    }
  }, [addresses, form]);

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId);
    const address = addresses.find((addr) => addr.id === addressId);
    if (address) {
      form.setValue("address", {
        country: address.country,
        firstName: address.firstName,
        lastName: address.lastName,
        address: address.address,
        apartment: address.apartment ?? "",
        city: address.city,
        governorate: address.governorate,
        postalCode: address.postalCode ?? "",
      });
    } else {
      // Reset form when selecting "Enter a new address"
      form.setValue("address", {
        country: "Egypt",
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        governorate:
          egyptianGovernorates.find((g) => g.value === "C")?.value ?? "",
        postalCode: "",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-medium">
            2
          </div>
          Shipping address
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {addresses.length > 0 && (
          <FormField
            control={form.control}
            name="address"
            render={() => (
              <FormItem>
                <FormLabel>Saved addresses</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={selectedAddress}
                    onValueChange={handleAddressSelect}
                    className="space-y-3"
                  >
                    {addresses.map((address) => (
                      <Label
                        key={address.id}
                        htmlFor={address.id}
                        className="flex items-start space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <RadioGroupItem
                          value={address.id}
                          id={address.id}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <span className="text-base font-medium">
                            {address.firstName} {address.lastName}
                          </span>
                          <div className="text-sm text-gray-600 mt-1 space-y-1">
                            <p>{address.address}</p>
                            {address.apartment && (
                              <p>Apt {address.apartment}</p>
                            )}
                            <p>
                              {address.city},{" "}
                              {
                                egyptianGovernorates.find(
                                  (g) => g.value === address.governorate,
                                )?.label
                              }
                            </p>
                            <p>{address.postalCode}</p>
                          </div>
                        </div>
                      </Label>
                    ))}
                    <Label
                      htmlFor="new-address"
                      className="flex items-start space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <RadioGroupItem
                        value="new-address"
                        id="new-address"
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <span className="text-base font-medium">
                          Enter a new address
                        </span>
                      </div>
                    </Label>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {(!addresses.length || selectedAddress === "") && (
          <>
            <FormField
              control={form.control}
              name="address.country"
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
                name="address.firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
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
              name="address.address"
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
              name="address.apartment"
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
                name="address.city"
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
                name="address.governorate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Governorate</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                name="address.postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Postal Code"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
