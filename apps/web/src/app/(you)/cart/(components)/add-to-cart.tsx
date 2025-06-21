"use client";

import "./AddToCart.css";
import { ItemPageI } from "@/lib/types";
import { useAddItemCart } from "../(utils)/use-cart";

export function AddToCart({
  data,
  selectedColor,
  selectedSize,
}: {
  data: ItemPageI;
  selectedColor: ItemPageI["colors"][number];
  selectedSize: ItemPageI["sizes"][number];
}) {
  const isDisabled = !selectedSize;
  const { mutate: addItemCart } = useAddItemCart();

  return (
    <button
      className={`cart-button ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
      onClick={() => {
        addItemCart({
          data,
          selectedSize,
          selectedColor,
        });
      }}
      disabled={isDisabled}
    >
      {isDisabled ? "Sold Out" : "Add to Cart"}
    </button>
  );
}
