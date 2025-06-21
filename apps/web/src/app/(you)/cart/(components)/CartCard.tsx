"use client";

import { Plus, Minus } from "lucide-react";
import Link from "next/link";

import { CrossIcon } from "@/components/Icons/CustomIcons";

import "./CartCard.css";
import { LoomImage } from "@/components/LoomImage";
import { ItemCart } from "@/app/(you)/cart/(utils)/cart-utils";

import { useDeleteItemCart, useEditItemCart } from "../(utils)/use-cart";

export function CartCard({ product }: { product: ItemCart }) {
  const { mutate: deleteItemCart } = useDeleteItemCart();
  const { mutate: editItemCart } = useEditItemCart();

  return (
    <>
      <div className="cart-card-wrapper">
        <LoomImage
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
            <p className="cart-card-price">
              {product.price * product.quantity}
            </p>
            <div className="cart-card-variants text-xs text-gray-500">
              <div className="cart-card-quantity">
                <button
                  className="quantity-button"
                  onClick={() =>
                    editItemCart({
                      product,
                      quantity: product.quantity - 1,
                    })
                  }
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="text-sm font-medium">{product.quantity}</span>
                <button
                  className="quantity-button"
                  onClick={() =>
                    editItemCart({
                      product,
                      quantity: product.quantity + 1,
                    })
                  }
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
              <p className="cart-card-size">Size: {product.size?.name}</p>
              <p className="cart-card-color capitalize">
                Color: {product.color?.name}
              </p>
            </div>
          </div>
          {/* <div className="cart-card-content-buttons">
            <LikeTextButton id={product.itemCard.id} />
          </div> */}
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
