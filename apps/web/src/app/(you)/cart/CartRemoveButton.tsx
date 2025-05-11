import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export function CartRemoveButton({ id }: { id: string }) {
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const inCart = cart.includes(id);
    setIsFilled(inCart);
  }, [id]);

  const toggleIcon = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsFilled((prevIsFilled) => !prevIsFilled);

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (isFilled) {
      cart = cart.filter((likedId: string) => likedId !== id);
    } else {
      cart.push(id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <>
      {
        <button
          className={`cart-button ${isFilled ? "cart-button-added" : ""}`}
          onClick={toggleIcon}
        >
          <Heart />
        </button>
      }
    </>
  );
}
