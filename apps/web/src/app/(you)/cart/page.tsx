"use client";

import React, { useState } from "react";

import { CartLayout } from "@/layouts/CartLayout/CartLayout";

import "./CartPage.css";
import { getCookie, removeValueFromCookie } from "@/app/(utils)/cookies.utils";
import { useQuery } from "@tanstack/react-query";
import { HttpMethods, httpService } from "@/lib/queries/http.service";
import { ItemCardsI } from "@/lib/types";
import queryClient from "@/lib/queries/queryClient";

export default function Cart() {
  let [subtotal, setSubtotal] = useState(0);

  const {
    data: cart,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const cart = await getCookie("cart");
      return httpService<ItemCardsI[]>(HttpMethods.POST, "/items-by-ids", {
        data: {
          ids: cart,
        },
        isServer: false,
        isResponseJson: true,
        isDataJson: true,
      });
    },
  });

  if (error) {
    return <div>An error occurred</div>;
  }

  function removeItem(key: string, value: string) {
    removeValueFromCookie(key, value);
    queryClient.invalidateQueries({ queryKey: ["cart"] });
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
        <CartLayout
          products={cart}
          removeItem={removeItem}
          isEmpty={cart?.length === 0}
        />
        <div className="cart-page-footer">
          <div className="subtotal-wrapper">
            <span>Subtotal</span>
            <span className="subtotal-amount">
              LE {subtotal.toLocaleString()}.00
            </span>
          </div>
          <p className="subtotal-note">
            Please note, you can only purchase items directly from their
            respective websites.
          </p>
        </div>
      </div>
    </>
  );
}
