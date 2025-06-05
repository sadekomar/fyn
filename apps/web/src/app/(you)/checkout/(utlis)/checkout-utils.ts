// @ts-nocheck
"use server";

import {
  httpService,
  HttpMethods,
  serverHttp,
} from "@/lib/queries/http.service";
import { ShippingEstimate } from "../../cart/(utils)/cart-utils";
import { Endpoints } from "@/lib/endpoints";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { createSession, getSession } from "@/lib/session";
import { register } from "@/lib/auth";
import { CheckoutFormSchema } from "../checkout-form";

type Address = {
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  governorate: string;
  postalCode: string;
};

type OrderItem = {
  itemId: string;
  quantity: number;
  name: string;
  image: string;
  price: number;
  sizeId: string;
  colorId?: string;
};

export type LoggedInOrderData = {
  isLoggedIn: true;
  userId: string;
  email: string;
  phoneNumber: string;
  address: Address;
  billingAddress: Partial<Address> | null;
  shippingEstimates: ShippingEstimate[];
  items: OrderItem[];
  paymentMethod: string;
};

export type GuestOrderData = {
  isLoggedIn: false;
  userId: string;
  email: string;
  phoneNumber: string;
  password: string;
  address: Address;
  billingAddress: Partial<Address> | null;
  shippingEstimates: ShippingEstimate[];
  items: OrderItem[];
  paymentMethod: string;
};

// this server action is what handles if a user account will be created first or not.
// both will call the register function
// the register function will log users in if they exist
// and it'll also register new users if they don't exist
// in both cases, i just need to send user id

export type OrderData = LoggedInOrderData | GuestOrderData;

type OrderSuccessResponse = {
  status: "success";
  message: string;
  data: {
    userId: string;
    isEmailConfirmed: boolean;
  };
};

type OrderErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type OrderResponse = OrderSuccessResponse | OrderErrorResponse;

type OrderRequest = {
  userId: string;
  checkoutFormData: CheckoutFormSchema;
  orderItems: OrderItem[];
};

export const createOrder = async (
  checkoutFormData: CheckoutFormSchema,
  orderItems: OrderItem[],
) => {
  const session = await getSession();
  let userId: string;

  if (!session && !checkoutFormData.isLoggedIn) {
    const newAccount = await register({
      email: checkoutFormData.email,
      password: checkoutFormData.password,
      username: checkoutFormData.email
        .split("@")[0]
        .concat(Math.random().toString(36).substring(2, 15)),
      firstName: checkoutFormData.address.firstName,
      lastName: checkoutFormData.address.lastName,
      phoneNumber: checkoutFormData.phoneNumber,
    });
    if (newAccount.status === "error") {
      console.log(newAccount.error);
      return newAccount;
    }
    await createSession(newAccount.data.userId);
    userId = newAccount.data.userId;
  } else if (session) {
    userId = session.userId;
  } else {
    throw new Error("Invalid state: session is null but user is logged in");
  }

  const response = await serverHttp.post<OrderRequest, OrderResponse>(
    Endpoints.Order,
    {
      userId,
      checkoutFormData,
      orderItems,
    },
  );

  if (response?.status === "error") {
    console.log(response);
    toast.error(response.error["root"][0]);
    return response;
  } else {
    toast.success(response.message);
    redirect("/order-confirmed");
  }

  return response;
};

export const isLoggedIn = async () => {
  const session = await getSession();
  return session?.userId;
};
