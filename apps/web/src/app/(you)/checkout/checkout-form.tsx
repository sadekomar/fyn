"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldErrors, useForm } from "react-hook-form";
import { egyptianGovernorates } from "./(utlis)/governorates";
import {
  clearCart,
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserCheckout } from "@/api/user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
  const session = useGetSession();
  const { data: cartItems = [] } = useGetCartItems();
  const router = useRouter();
  const queryClient = useQueryClient();

  if (cartItems.length === 0) {
    router.push("/");
  }

  const { data: user } = useQuery({
    queryKey: ["user", session?.userId],
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

  async function onSubmit(orderForm: OrderFormSchema) {
    const orderItems = cartItems.map((item) => ({
      itemId: item.localCartItem.itemId,
      quantity: item.localCartItem.quantity,
      name: item.itemCard.name,
      image: item.itemCard.image,
      price: item.itemCard.price,
      sizeId: item.localCartItem.size.id,
      colorId: item.localCartItem.color?.id,
    }));

    const response = await createOrder(
      orderForm,
      orderItems,
      shippingEstimates,
    );
    clearCart();
    queryClient.invalidateQueries({ queryKey: ["cart"] });

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
