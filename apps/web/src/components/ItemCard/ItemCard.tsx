import Link from "next/link";
import Image from "next/image";

import "./ItemCard.css";
import "./Feather.css";
import { LikeButton } from "./LikeButton";
import { CompareButton } from "../CompareButton";
import { LoomImage } from "../LoomImage";
import { ItemCardsI } from "@/types";

export function ItemCard({
  id,
  name,
  price,
  brand,
  image,
  imgLoading = "lazy",
  className = "",
}: ItemCardsI & { imgLoading?: "lazy" | "eager"; className?: string }) {
  if (!image) {
    return null;
  }

  return (
    <>
      <div className={`ItemCard ${className}`}>
        <LikeButton id={id} className="LikeButton" />
        <CompareButton id={id} className="CompareButton" />
        <Link href={`/item/${id}`}>
          <LoomImage
            loading={imgLoading}
            src={image}
            width={260}
            height={340}
            alt={name}
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
        </Link>

        <Link href={`/item/${id}`}>{name}</Link>
        <Link href={`/brands/${brand}`}>{brand}</Link>
        <data value={price}>LE {price.toLocaleString()}</data>
      </div>
    </>
  );
}
