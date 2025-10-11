"use server";

import { serverHttp } from "@/lib/queries/http.service";
import { ShippingEstimate } from "../../cart/(utils)/cart-utils";
import { Endpoints } from "@/api/endpoints";
import { getSession } from "@/lib/session";
import { register } from "@/lib/auth";
import { OrderFormSchema } from "../checkout-form";
import {
  CreateOrderRequest,
  CreateOrderResponse,
} from "@/api/types/order-types";

type OrderItem = {
  itemId: string;
  quantity: number;
  name: string;
  image: string;
  price: number;
  sizeId: string;
  colorId?: string;
};

export const createOrder = async (
  orderForm: OrderFormSchema,
  orderItems: OrderItem[],
  shippingEstimates: ShippingEstimate[],
) => {
  const session = await getSession();
  let userId: string;

  if (!session && !orderForm.isLoggedIn && !orderForm.address.isSavedAddress) {
    const newAccount = await register({
      email: orderForm.email,
      password: orderForm.password,
      username: orderForm.email
        .split("@")[0]
        .concat(Math.random().toString(36).substring(2, 15)),
      firstName: orderForm.address.firstName,
      lastName: orderForm.address.lastName,
      phoneNumber: orderForm.phoneNumber,
    });
    if (newAccount.status === "error") {
      console.log(newAccount.error);
      return newAccount;
    }
    userId = newAccount.data.id;
  } else if (session) {
    userId = session.userId;
  } else {
    throw new Error("Invalid state: session is null but user is logged in");
  }

  let data: CreateOrderRequest;
  if (orderForm.address.isSavedAddress) {
    data = {
      userId: userId,
      email: orderForm.email,
      phoneNumber: orderForm.phoneNumber,
      shippingEstimates: shippingEstimates.map((estimate) => ({
        cost: estimate.cost,
        brand: estimate.brand,
      })),
      isSavedAddress: true,
      addressId: orderForm.address.addressId,
      itemOrders: orderItems.map((item) => ({
        itemId: item.itemId,
        quantity: item.quantity,
        name: item.name,
        image: item.image,
        price: item.price,
        sizeId: item.sizeId,
        colorId: item.colorId ?? null,
      })),
    };
  } else {
    data = {
      userId: userId,
      email: orderForm.email,
      phoneNumber: orderForm.phoneNumber,
      shippingEstimates: shippingEstimates.map((estimate) => ({
        cost: estimate.cost,
        brand: estimate.brand,
      })),
      isSavedAddress: false,
      address: {
        firstName: orderForm.address.firstName,
        lastName: orderForm.address.lastName,
        address: orderForm.address.address,
        apartment: orderForm.address.apartment ?? null,
        city: orderForm.address.city,
        governorate: orderForm.address.governorate,
        postalCode: orderForm.address.postalCode,
      },
      itemOrders: orderItems.map((item) => ({
        itemId: item.itemId,
        quantity: item.quantity,
        name: item.name,
        image: item.image,
        price: item.price,
        sizeId: item.sizeId,
        colorId: item.colorId ?? null,
      })),
    };
  }

  const response = await serverHttp.post<
    CreateOrderRequest,
    CreateOrderResponse
  >(Endpoints.Order, data);

  return response;
};

export const isLoggedIn = async () => {
  const session = await getSession();
  return session?.userId;
};
