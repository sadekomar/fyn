"use client";

import "./AddToCart.css";
import { ItemPageI } from "@/lib/types";
import { useAddToCart } from "../(utils)/use-cart";

export function AddToCart({
  data,
  selectedColor,
  selectedSize,
}: {
  data: ItemPageI;
  selectedColor: ItemPageI["colors"][number];
  selectedSize: ItemPageI["sizes"][number];
}) {
  const addToCart = useAddToCart();

  return (
    <button
      className={`cart-button ${!selectedSize || !selectedColor ? "cursor-not-allowed opacity-50" : ""}`}
      onClick={() => {
        addToCart(data, selectedSize, selectedColor);
      }}
      disabled={!selectedSize}
    >
      Add to Cart
    </button>
  );
}
