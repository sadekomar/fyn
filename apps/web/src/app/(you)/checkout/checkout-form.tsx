"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldErrors, useForm } from "react-hook-form";
import { egyptianGovernorates } from "./(utlis)/governorates";
import {
  getShippingEstimates,
  getTotalPrice,
} from "@/app/(you)/cart/(utils)/cart-utils";
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
import { useGetUser } from "@/lib/use-auth";
import { useQuery } from "@tanstack/react-query";
import { getUserCheckout } from "@/api/user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetItemCarts } from "../cart/(utils)/use-cart";

export const orderFormSchema = z.discriminatedUnion("isLoggedIn", [
  z.object({
    isLoggedIn: z.literal(true),
    email: z.string().email({ message: "Invalid email address" }),
    phoneNumber: z.string(),
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

export type OrderFormSchema = z.infer<typeof orderFormSchema>;

export default function CheckoutPage() {
  const session = useGetUser();
  const { data: allCartItems = [] } = useGetItemCarts();
  const cartItems = allCartItems.filter((item) => !item.isSavedForLater);
  const router = useRouter();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserCheckout(session?.userId),
    enabled: session !== null,
  });

  const subtotal = getTotalPrice(cartItems);
  const shippingEstimates = getShippingEstimates(cartItems);
  const total =
    subtotal +
    shippingEstimates.reduce((acc, estimate) => acc + estimate.cost, 0);

  const form = useForm<OrderFormSchema>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      isLoggedIn: session !== null,
      email: user?.email ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      password: "",
      address: {
        isSavedAddress: false,
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

  useEffect(() => {
    form.setValue("isLoggedIn", session !== null);
  }, [form, session]);

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/");
    }
  }, [cartItems.length, router]);

  async function onSubmit(orderForm: OrderFormSchema) {
    const orderItems = cartItems.map((item) => ({
      itemId: item.itemId,
      quantity: item.quantity,
      name: item.name,
      image: item.image,
      price: item.price,
      sizeId: item.size.id,
      colorId: item.color?.id,
    }));

    const response = await createOrder(
      orderForm,
      orderItems,
      shippingEstimates,
    );

    if (response.status === "error") {
      form.setError(Object.keys(response.error)[0] as keyof OrderFormSchema, {
        type: "manual",
        message: response.error[Object.keys(response.error)[0]][0],
      });
    } else {
      router.push(`/order-confirmed?orderId=${response.data.orderId}`);
    }
  }

  function onInvalid(errors: FieldErrors<OrderFormSchema>) {
    console.log("errors", errors);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="space-y-6"
      >
        <input type="hidden" {...form.register("isLoggedIn")} />
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <BackToCart />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <ContactInfo isLoggedIn={session !== null} form={form} />
                <ShippingAddress
                  isLoggedIn={session !== null}
                  form={form}
                  addresses={user?.addresses}
                />
                <BillingAddress form={form} />
                <PaymentMethod />
              </div>

              <OrderSummary
                cartItems={cartItems}
                shippingEstimates={shippingEstimates}
                subtotal={subtotal}
                total={total}
                formSubmitting={form.formState.isSubmitting}
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
