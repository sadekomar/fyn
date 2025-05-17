// @ts-nocheck

import { useEffect, useState } from "react";

import { CartCard } from "./CartCard";
import Link from "next/link";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { ItemCardsI } from "@/lib/types";
export function CartLayout({
  products,
  removeItem,
  isEmpty,
}: {
  products: ItemCardsI[] | undefined;
  removeItem: (key: string, value: string) => void;
  isEmpty: boolean;
}) {
  return (
    <>
      <div className="cart-cards-wrapper">
        {products?.length != 0 || !isEmpty ? (
          products?.map((product, index) => (
            <CartCard key={index} product={product} removeItem={removeItem} />
          ))
        ) : (
          <EmptyState title="Your cart is empty">
            <p>
              Check your{" "}
              <Link className="inline-link" href={"/liked-items"}>
                likes
              </Link>{" "}
              or{" "}
              <Link className="inline-link" href={"/all-categories"}>
                continue shopping
              </Link>
              .
            </p>
          </EmptyState>
        )}
      </div>
    </>
  );
}
