"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import * as Toast from "@radix-ui/react-toast";

import "./AddToCart.css";

export function AddToCart({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  const [isFilled, setIsFilled] = useState(false);

  const [open, setOpen] = React.useState(false);
  const eventDateRef = React.useRef(new Date());
  const timerRef = React.useRef(0);

  function oneWeekAway() {
    const now = new Date();
    const inOneWeek = now.setDate(now.getDate() + 7);
    return new Date(inOneWeek);
  }

  function prettyDate(date: number | Date | undefined) {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(date);
  }

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const inCart = cart.includes(id);
    setIsFilled(inCart);
  }, [id]);

  const toggleIcon = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsFilled((prevIsFilled) => !prevIsFilled);

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (isFilled) {
      cart = cart.filter((likedId: string) => likedId !== id);
    } else {
      cart.push(id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    // Use CustomEvent instead of Event to pass data
    const event = new CustomEvent("localStorageChanged", {
      detail: {
        key: "cart",
        value: JSON.stringify(cart),
      },
    });
    window.dispatchEvent(event);
  };

  return (
    <>
      <Toast.Provider swipeDirection="right">
        <Toast.Viewport className="ToastViewport" />
        <button
          className={`cart-button ${isFilled ? "cart-button-added" : ""}`}
          onClick={(e) => {
            setOpen((currentOpenState) => !currentOpenState);
            window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => {
              eventDateRef.current = oneWeekAway();
              setOpen(true);
            }, 100);
            toggleIcon(e);
          }}
        >
          {isFilled ? "Added" : "Add to Cart"}
        </button>

        <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
          <Toast.Title className="ToastTitle">
            {isFilled
              ? "Added item to your cart"
              : "Removed item from your cart"}
          </Toast.Title>
          <Toast.Action className="ToastAction" asChild altText="view cart">
            <Link className="view-cart-button" href={"/cart"}>
              View Cart
            </Link>
          </Toast.Action>
        </Toast.Root>
      </Toast.Provider>
    </>
  );
}
