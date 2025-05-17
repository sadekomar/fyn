// @ts-nocheck
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../../app/(utils)/localStorageUtils";
import { LikeTextButton } from "../../components/LikeButton/LikeTextButton";
import { CrossIcon } from "../../components/Icons/CustomIcons";

import "./CartCard.css";
import { LoomImage } from "@/components/LoomImage";
import { ItemPageI } from "@/lib/types";

export function CartCard({
  product,
  removeItem,
}: {
  product: ItemPageI;
  removeItem: (key: string, value: string) => void;
}) {
  return (
    <>
      <div className="cart-card-wrapper">
        <LoomImage
          className="cart-card-img"
          src={product.images[0]["src"]}
          srcSet={product.images[0]["srcset"]}
          sizes="120px"
          alt=""
        />
        <div className="cart-card-content">
          <div className="cart-card-content-info">
            <Link href={`/item/${product.id}`} className="cart-card-title">
              {product.name}
            </Link>
            <Link href={`/brands/${product.brand}`} className="cart-card-brand">
              {product.brand}
            </Link>
            <p className="cart-card-price">{product.price}</p>
          </div>
          <div className="cart-card-content-buttons">
            <LikeTextButton id={product.id} />
            <a
              href={`${product.link}?ref=loomcairo`}
              target="_blank"
              rel="noopener noreferrer"
              className="cart-card-buy-button"
            >
              Buy
            </a>
          </div>
        </div>
        <button
          className="cart-card-remove-button"
          onClick={() => {
            removeItem("cart", product.id);
          }}
        >
          <CrossIcon width="13" />
        </button>
      </div>
    </>
  );
}
