"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import "./AddToCart.css";
import { toast } from "sonner";

export function AddToCart({ id }: { id: string }) {
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    // Use CustomEvent instead of Event to pass data
    const event = new CustomEvent("localStorageChanged", {
      detail: {
        key: "cart",
        value: JSON.stringify(cart),
      },
    });
    window.dispatchEvent(event);
    toast.success("Added item to cart");
  };

  return (
    <button className={`cart-button`} onClick={addToCart}>
      Add to Cart
    </button>
  );
}
