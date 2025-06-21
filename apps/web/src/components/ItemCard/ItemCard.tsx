"use client";

import Link from "next/link";

import "./ItemCard.css";
import "./Feather.css";
// import { CompareButton } from "../CompareButton";
import { LoomImage } from "../LoomImage";
import { ItemCardsI } from "@/lib/types";
import { useState } from "react";

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
        className={`ItemCard ${className} relative transition-all duration-300 active:scale-103 ${
          isSoldOut ? "opacity-75" : ""
        }`}
      >
        {/* <CompareButton id={id} className="CompareButton" /> */}
        <Link prefetch={true} href={`/item/${id}`} className="relative block">
          <LoomImage
            loading={imgLoading}
            src={image === "" ? undefined : image}
            width={260}
            height={340}
            alt={name}
            onError={() => setImageError(true)}
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              maxWidth: "100%",
              height: "340px",
              backgroundColor: "var(--gray-5)",
              borderRadius: "8px",
              transitionProperty: "width",
              transitionDuration: "0.3s",
              transitionTimingFunction: "ease",
              transitionDelay: "0s",
            }}
          />
          {isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
              <span className="text-lg font-semibold text-white">Sold Out</span>
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
