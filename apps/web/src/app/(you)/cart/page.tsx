"use client";

import React, { useEffect, useState, useRef } from "react";

import { IPAddress } from "@/data/IPAddress";
import { CartLayout } from "@/layouts/CartLayout/CartLayout";

import "./CartPage.css";

export default function Cart() {
  let [subtotal, setSubtotal] = useState(0);
  const abortControllerRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  async function fetchData(cart: string[]) {
    setIsLoading(true);

    let cartString = cart.join(",");
    try {
      if (cart.length !== 0) {
        const response = await fetch(`${IPAddress}/ids?ids=${cartString}`);
        const data = await response.json();
        setProducts(data);
        let total = 0;
        for (let i = 0; i < data.length; i++) {
          total += data[i].price;
        }
        setSubtotal(total);
      } else {
        setProducts([]);
        setSubtotal(0);
        setIsEmpty(true);
      }
    } catch (e: unknown) {
      if (e instanceof Error && e.name === "AbortError") {
        return;
      }
      setError(e as React.SetStateAction<undefined>);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    // const cart = getCookie("cart");
    const cart: string[] = []; // Initialize with empty array as a temporary fix
    fetchData(cart);
  }, []);

  if (error) {
    return <div>An error occurred</div>;
  }

  function removeCard(key: string, value: string) {
    // removeValueFromCookie(key, value);
    // let cart = getCookie(key);
    const cart: string[] = [];
    fetchData(cart);
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
          products={products}
          removeCard={removeCard}
          isEmpty={isEmpty}
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
