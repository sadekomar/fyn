import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../../app/(utils)/localStorageUtils";
import { LikeTextButton } from "../../components/LikeButton/LikeTextButton";
import { CrossIcon } from "../../components/Icons/CustomIcons";

import "./CartCard.css";

export function CartCard({ product, removeCard }) {
  return (
    <>
      <div className="cart-card-wrapper">
        <img
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
            removeCard("cart", product.id);
          }}
        >
          <CrossIcon width="13" />
        </button>
      </div>
    </>
  );
}
