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
    return <div>An error occurred</div>;
  }

  return (
    <>
      <div className="cart-page-header">
        <h2>Your Cart</h2>
        <p>
          When you're ready to make a purchase, we will direct you to the
          original website to complete your transaction.
        </p>
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
              href="/checkout"
              className="w-full block bg-black text-white py-3 px-4 text-center rounded-md hover:bg-gray-800 transition-colors"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
