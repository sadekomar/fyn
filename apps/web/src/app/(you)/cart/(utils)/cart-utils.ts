"use client";

import { ItemCardsI, ItemPageI } from "@/lib/types";

export type CartItem = {
  id: string;
  itemId: string;
  quantity: number;
  size: {
    id: string;
    name: string;
  };
  color: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
};

export type CartItemWithItemCard = {
  localCartItem: CartItem;
  itemCard: ItemCardsI;
};

export function addToLocalCart(
  data: ItemPageI,
  selectedSize: { id: string; name: string; available: boolean },
  selectedColor: { id: string; name: string },
) {
  const cart = getItemsFromLocalCart();

  const existingItem = cart.find((item) => {
    return (
      item.itemId === data.id &&
      item.size.id === selectedSize.id &&
      item.color?.id === selectedColor.id
    );
  });
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.unshift({
      id: crypto.randomUUID(),
      itemId: data.id,
      quantity: 1,
      size: {
        id: selectedSize.id,
        name: selectedSize.name,
      },
      color: {
        id: selectedColor.id,
        name: selectedColor.name,
      },
      createdAt: new Date(),
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  const event = new CustomEvent("localStorageChanged", {
    detail: {
      key: "cart",
      value: JSON.stringify(cart),
    },
  });

  window.dispatchEvent(event);
}

export function removeFromCart(id: string) {
  const cart = getItemsFromLocalCart();
  const newCart = cart.filter((item: CartItem) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(newCart));
  const event = new CustomEvent("localStorageChanged", {
    detail: {
      key: "cart",
      value: JSON.stringify(newCart),
    },
  });
  window.dispatchEvent(event);
}

export function clearCart() {
  localStorage.removeItem("cart");
  const event = new CustomEvent("localStorageChanged", {
    detail: {
      key: "cart",
      value: "[]",
    },
  });
  window.dispatchEvent(event);
}

export function getItemsFromLocalCart(): CartItem[] {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function getTotalPrice(cart: CartItemWithItemCard[]) {
  return cart.reduce(
    (acc, item) => acc + item.itemCard.price * item.localCartItem.quantity,
    0,
  );
}

export type ShippingEstimate = {
  brand: string;
  cost: number;
  itemIds: string[];
};

export function getShippingEstimates(
  cartItems: CartItemWithItemCard[],
): ShippingEstimate[] {
  const shippingEstimates: ShippingEstimate[] = [];
  const uniqueBrands = [
    ...new Set(cartItems.map((item) => item.itemCard.brand)),
  ];
  uniqueBrands.forEach((brand) => {
    shippingEstimates.push({
      brand: brand,
      cost: 70,
      itemIds: cartItems
        .filter((item) => item.itemCard.brand === brand)
        .map((item) => item.itemCard.id),
    });
  });
  return shippingEstimates;
}

export function updateCartItemQuantity(id: string, newQuantity: number) {
  const cart = getItemsFromLocalCart();
  const item = cart.find((item: CartItem) => item.id === id);
  if (item) {
    item.quantity = Math.max(1, newQuantity); // Ensure quantity is at least 1
    localStorage.setItem("cart", JSON.stringify(cart));
    const event = new CustomEvent("localStorageChanged", {
      detail: {
        key: "cart",
        value: JSON.stringify(cart),
      },
    });
    window.dispatchEvent(event);
  }
}
