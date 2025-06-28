"use client";

import Link from "next/link";

import "./ItemCard.css";
import "./Feather.css";
// import { CompareButton } from "../CompareButton";
import { ItemCardsI } from "@/lib/types";
import { useState } from "react";
import { CardImage } from "../card-image";

export function ItemCard({
  id,
  name,
  price,
  brand,
  image,
  imgLoading = "lazy",
  className = "",
  isSoldOut = false,
}: ItemCardsI & {
  imgLoading?: "lazy" | "eager";
  className?: string;
  isSoldOut?: boolean;
}) {
  const [imageError, setImageError] = useState(false);

  if (!image || imageError) {
    return null;
  }

  return (
    <>
      <div
        className={`ItemCard ${className} transition-all duration-300 active:scale-103 ${
          isSoldOut ? "opacity-75" : ""
        }`}
      >
        {/* <CompareButton id={id} className="CompareButton" /> */}
        <Link prefetch={true} href={`/item/${id}`} className="relative">
          <CardImage
            loading={imgLoading}
            src={image === "" ? undefined : image}
            alt={name}
            onError={() => setImageError(true)}
            style={{
              borderRadius: "8px",
              width: "100%",
              height: "300px",
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
          className={`block ${isSoldOut ? "text-gray-500" : ""}`}
        >
          {name}
        </Link>
        <Link
          prefetch={true}
          href={`/brands/${brand}`}
          className="text-gray-500 capitalize underline-offset-2 hover:text-gray-700 hover:underline"
        >
          {brand}
        </Link>
        <data value={price} className={isSoldOut ? "text-gray-500" : ""}>
          LE {price.toLocaleString()}
        </data>
      </div>
    </>
  );
}
