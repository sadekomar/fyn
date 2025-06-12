"use client";

import React, { useEffect, useState } from "react";

import { CartLayout } from "@/app/(you)/cart/(components)/CartLayout";
import { CartSkeleton } from "@/app/(you)/cart/(components)/CartSkeleton";
import "./(components)/CartPage.css";
import { getTotalPrice } from "./(utils)/cart-utils";
import { useGetCartItems } from "./(utils)/use-cart";
import Link from "next/link";

export default function Cart() {
  const { data: cart = [], error, isLoading } = useGetCartItems();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    setTotalPrice(getTotalPrice(cart || []));
  }, [cart]);

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-8 text-center">
        <div className="text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto mb-4"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h3 className="mb-2 text-lg font-semibold">Unable to load cart</h3>
          <p className="text-sm text-red-500">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading your cart"}
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="cart-page-header">
        <h2>Your Cart</h2>
      </div>
      <div className="cart-wrapper">
        {isLoading ? (
          <div className="cart-cards-wrapper">
            {[...Array(3)].map((_, index) => (
              <CartSkeleton key={index} />
            ))}
          </div>
        ) : (
          <CartLayout products={cart} isEmpty={cart.length === 0} />
        )}
        <div className="cart-page-footer">
          <div className="subtotal-wrapper">
            <span>Subtotal</span>
            <span className="subtotal-amount">
              LE {totalPrice.toLocaleString()}.00
            </span>
          </div>
          <div className="w-full">
            <Link
              href={cart.length === 0 ? "#" : "/checkout"}
              className="block w-full rounded-md bg-black px-4 py-3 text-center text-white transition-colors hover:bg-gray-800"
              style={{
                opacity: cart.length === 0 ? 0.5 : 1,
                pointerEvents: cart.length === 0 ? "none" : "auto",
              }}
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
