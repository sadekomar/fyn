"use client";

import "./AddToCart.css";
import { useAddItemCart } from "../(utils)/use-cart";
import { ItemSuccess } from "@/app/item/[id]/item";

export function AddToCart({
  data,
  selectedColor,
  selectedSize,
}: {
  data: ItemSuccess;
  selectedColor: ItemSuccess["colors"][number];
  selectedSize: ItemSuccess["sizes"][number];
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
