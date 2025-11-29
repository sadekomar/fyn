"use client";

import Link from "next/link";
import { CrossIcon } from "@/components/Icons/CustomIcons";
import "./CartCard.css";
import { ClyoImage } from "@/components/clyo-image";
import { ItemCart } from "@/app/(you)/cart/(utils)/cart-utils";
import { useDeleteItemCart, useMoveToCart } from "../(utils)/use-cart";

export function SavedForLaterCard({ product }: { product: ItemCart }) {
  const { mutate: deleteItemCart } = useDeleteItemCart();
  const { mutate: moveToCart } = useMoveToCart();

  return (
    <>
      <div className="cart-card-wrapper">
        <ClyoImage
          className="cart-card-img"
          src={product.image}
          sizes="120px"
          alt=""
        />
        <div className="cart-card-content">
          <div className="cart-card-content-info">
            <Link href={`/item/${product.itemId}`} className="cart-card-title">
              {product.name}
            </Link>
            <Link
              href={`/brands/${product.brand.name}`}
              className="cart-card-brand"
            >
              {product.brand.name}
            </Link>
            <p className="cart-card-price">{product.price.toLocaleString()}</p>
            <div className="cart-card-variants text-xs text-gray-500">
              <p className="cart-card-size">Size: {product.size?.name}</p>
              <p className="cart-card-color capitalize">
                Color: {product.color?.name || "N/A"}
              </p>
              <p className="cart-card-quantity">Quantity: {product.quantity}</p>
            </div>
            <div className="mt-3">
              <button
                className="w-full rounded-md bg-black px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                onClick={() => moveToCart({ id: product.id })}
              >
                Move to Cart
              </button>
            </div>
          </div>
        </div>
        <button
          className="cart-card-remove-button"
          onClick={() => {
            deleteItemCart({ id: product.id });
          }}
        >
          <CrossIcon width="13" />
        </button>
      </div>
    </>
  );
}
