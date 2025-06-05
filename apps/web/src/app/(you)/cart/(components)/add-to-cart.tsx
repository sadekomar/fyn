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
      className={`cart-button ${!selectedSize || !selectedColor ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={() => {
        addToCart(data, selectedSize, selectedColor);
      }}
      disabled={!selectedSize || !selectedColor}
    >
      Add to Cart
    </button>
  );
}
