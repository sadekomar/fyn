"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import * as Toast from "@radix-ui/react-toast";

import "./AddToCart.css";

export function AddToCart({ id, className }) {
  const [isFilled, setIsFilled] = useState(false);

  const [open, setOpen] = React.useState(false);
  const eventDateRef = React.useRef(new Date());
  const timerRef = React.useRef(0);

  function oneWeekAway(date) {
    const now = new Date();
    const inOneWeek = now.setDate(now.getDate() + 7);
    return new Date(inOneWeek);
  }

  function prettyDate(date) {
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

  const toggleIcon = (e) => {
    e.stopPropagation();
    setIsFilled((prevIsFilled) => !prevIsFilled);

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (isFilled) {
      cart = cart.filter((likedId) => likedId !== id);
    } else {
      cart.push(id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    const event = new Event("localStorageChanged");
    event.key = "cart";
    event.value = JSON.stringify(cart);
    window.dispatchEvent(event);
  };

  return (
    <>
      <Toast.Provider swipeDirection="right">
        <Toast.Viewport className="ToastViewport" />
        <button
          className={`cart-button ${isFilled ? "cart-button-added" : ""}`}
          onClick={() => {
            setOpen((currentOpenState) => !currentOpenState);
            window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => {
              eventDateRef.current = oneWeekAway();
              setOpen(true);
            }, 100);
            toggleIcon(event);
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
