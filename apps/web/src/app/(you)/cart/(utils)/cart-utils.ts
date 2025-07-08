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
};

export type CartItemWithItemCard = {
  localCartItem: ItemCart;
  itemCard: ItemCardsI;
};

export function addToLocalCart(
  data: ItemSuccess,
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
      name: data.name,
      price: data.price,
      brand: {
        id: data.brand,
        name: data.brand,
      },
      image: data.images[0],
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
  const newCart = cart.filter((item: ItemCart) => item.id !== id);
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

export function getItemsFromLocalCart(): ItemCart[] {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function getTotalPrice(cart: ItemCart[]) {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
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
      cost: 70,
      itemIds: cartItems
        .filter((item) => item.brand.name === brand)
        .map((item) => item.id),
    });
  });
  return shippingEstimates;
}

export function updateCartItemQuantity(id: string, newQuantity: number) {
  const cart = getItemsFromLocalCart();
  const item = cart.find((item: ItemCart) => item.id === id);
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
