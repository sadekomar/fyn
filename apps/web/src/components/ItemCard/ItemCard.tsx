"use client";

import Link from "next/link";

import "./ItemCard.css";
import "./Feather.css";
// import { CompareButton } from "../CompareButton";
import { ItemCardsI } from "@/lib/types";
import { useState } from "react";
import { CardImage } from "../card-image";
import { LikeButton } from "./LikeButton";

export function ItemCard({
  id,
  name,
  price,
  brand,
  image,
  imgLoading = "lazy",
  className = "",
  isSoldOut = false,
  theme,
  highestPrice = null,
}: ItemCardsI & {
  imgLoading?: "lazy" | "eager";
  className?: string;
  isSoldOut?: boolean;
  theme?: "dark" | "light";
  highestPrice?: number | null;
}) {
  const [imageError, setImageError] = useState(false);

  if (!image || imageError) {
    return null;
  }

  const item: ItemCardsI = {
    id,
    name,
    price,
    brand,
    image,
    isSoldOut,
  };

  return (
    <>
      <div
        className={`ItemCard ${className} transition-all duration-300 ${
          isSoldOut ? "opacity-75" : ""
        }`}
      >
        <LikeButton id={id} className="LikeButton" item={item} />
        <Link prefetch={true} href={`/item/${id}`} className="relative">
          <CardImage
            className="transition-all duration-300 active:scale-95"
            loading={imgLoading}
            src={image === "" ? undefined : image}
            sizes="(max-width: 768px) 180px, 240px"
            alt={name}
            onError={() => setImageError(true)}
            style={{
              borderRadius: "8px",
              width: "100%",
              height: "240px",
              backgroundColor: "var(--gray-5)",
            }}
          />
          {isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
              <span className="text-lg font-semibold text-white">
                Out of stock
              </span>
            </div>
          )}
        </Link>

        <Link
          prefetch={true}
          href={`/item/${id}`}
          className={`mt-1 block ${isSoldOut ? "text-gray-500" : ""} text-sm`}
        >
          {name}
        </Link>
        <Link
          prefetch={true}
          href={`/brands/${brand.name}`}
          className={`${theme === "dark" ? "text-white hover:text-gray-300" : "text-gray-500 hover:text-gray-700"} text-sm underline-offset-2 transition-all duration-300 hover:underline active:scale-105`}
        >
          {brand.label ?? brand.name}
        </Link>
        <div className="flex items-center gap-2">
          <data
            value={price}
            className={`${isSoldOut ? "text-gray-500" : ""} ${
              highestPrice ? "text-red-500" : ""
            } text-sm`}
          >
            LE {price.toLocaleString()}
          </data>
          {highestPrice && (
            <data value={highestPrice}>
              <span className="text-sm text-gray-500 line-through">
                LE {highestPrice.toLocaleString()}
              </span>
            </data>
          )}
        </div>
      </div>
    </>
  );
}
