"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { egyptianGovernorates } from "./(utlis)/governorates";
import {
  getShippingEstimates,
  getTotalPrice,
} from "@/app/(you)/cart/(utils)/cart-utils";
import { useGetCartItems } from "@/app/(you)/cart/(utils)/use-cart";
import { createOrder } from "./(utlis)/checkout-utils";

import {
  BillingAddress,
  billingAddressSchema,
} from "./components/billing-address";
import { ContactInfo } from "./components/contact-info";
import { addressSchema, ShippingAddress } from "./components/shipping-address";
import { OrderSummary } from "./components/order-summary";
import { PaymentMethod } from "./components/payment-method";
import { BackToCart } from "./components/back-to-cart";
import { useGetSession } from "@/lib/use-auth";
import { clientHttp } from "@/lib/queries/http.service";
import { Endpoints } from "@/lib/endpoints";
import { useQuery } from "@tanstack/react-query";

export const checkoutSchema = z.discriminatedUnion("isLoggedIn", [
  z.object({
    isLoggedIn: z.literal(true),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    phoneNumber: z.string().optional(),
    address: addressSchema,
    billingAddress: billingAddressSchema,
  }),
  z.object({
    isLoggedIn: z.literal(false),
    email: z.string().email({ message: "Invalid email address" }),
    phoneNumber: z.string().min(10, { message: "Phone number is required" }),
    password: z.string().min(8, { message: "Password is required" }),
    address: addressSchema,
    billingAddress: billingAddressSchema,
  }),
]);

export type CheckoutFormSchema = z.infer<typeof checkoutSchema>;

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

type AddressType = "NORMAL" | "BILLING";

export type Address = {
  userId: string;
  address: string;
  id: string;
  firstName: string;
  lastName: string;
  company: string | null;
  apartment: string | null;
  city: string;
  governorate: string;
  country: string;
  postalCode: string | null;
  createdAt: Date;
  addressType: AddressType;
};

export default function CheckoutPage() {
  const session = useGetSession();
  const { data: cartItems = [] } = useGetCartItems();

  const { data: user } = useQuery({
    queryKey: ["user", session?.userId],
    queryFn: () => clientHttp.get<User>(`/user/${session?.userId}`),
    enabled: session !== null,
  });
  const { data: addresses } = useQuery({
    queryKey: ["addresses", session?.userId],
    queryFn: () => clientHttp.get<Address[]>(`/addresses/${session?.userId}`),
    enabled: session !== null,
  });

  console.log(addresses);

  const subtotal = getTotalPrice(cartItems);
  const shippingEstimates = getShippingEstimates(cartItems);
  const total =
    subtotal +
    shippingEstimates.reduce((acc, estimate) => acc + estimate.cost, 0);

  const form = useForm<CheckoutFormSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      isLoggedIn: session !== null,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      password: "",
      address: {
        city: "",
        governorate: egyptianGovernorates.find(
          (governorate) => governorate.value === "C",
        )?.value,
        postalCode: "",
        country: "Egypt",
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
      },
      billingAddress: {
        city: "",
        governorate: egyptianGovernorates.find(
          (governorate) => governorate.value === "C",
        )?.value,
        postalCode: "",
        country: "Egypt",
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
      },
    },
  });

  async function onSubmit(data: CheckoutFormSchema) {
    const orderItems = cartItems.map((item) => ({
      itemId: item.localCartItem.itemId,
      quantity: item.localCartItem.quantity,
      name: item.itemCard.name,
      image: item.itemCard.image,
      price: item.itemCard.price,
      sizeId: item.localCartItem.size.id,
      colorId: item.localCartItem.color?.id,
    }));

    createOrder(data, orderItems);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <input type="hidden" {...form.register("isLoggedIn")} />
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BackToCart />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <ContactInfo loggedIn={session !== null} form={form} />
                <ShippingAddress form={form} addresses={addresses} />
                <BillingAddress form={form} />
                <PaymentMethod />
              </div>

              <OrderSummary
                cartItems={cartItems}
                shippingEstimates={shippingEstimates}
                subtotal={subtotal}
                total={total}
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
