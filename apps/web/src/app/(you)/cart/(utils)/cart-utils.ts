"use client";

import { ItemCardsI } from "@/lib/types";
import { ItemSuccess } from "@/app/item/[id]/item";

// Read
export type ItemCart = {
  id: string;
  quantity: number;
  size: {
    id: string;
    name: string;
  };
  color: {
    id: string;
    name: string;
  } | null;
  // item card data
  itemId: string;
  name: string;
  price: number;
  brand: {
    id: string;
    name: string;
  };
  image: string;
  isSavedForLater: boolean;
};

export function getTotalPrice(cart: ItemCart[]) {
  return cart
    .filter((item) => !item.isSavedForLater)
    .reduce((acc, item) => acc + item.price * item.quantity, 0);
}

export type ShippingEstimate = {
  brand: string;
  cost: number;
  itemIds: string[];
};

export function getShippingEstimates(
  cartItems: ItemCart[],
): ShippingEstimate[] {
  const shippingEstimates: ShippingEstimate[] = [];
  const uniqueBrands = [...new Set(cartItems.map((item) => item.brand.name))];
  uniqueBrands.forEach((brand) => {
    shippingEstimates.push({
      brand: brand,
      cost: 80,
      itemIds: cartItems
        .filter((item) => item.brand.name === brand)
        .map((item) => item.id),
    });
  });
  return shippingEstimates;
}
