"use client";

import { Flex } from "@radix-ui/themes";
import { AddToCart } from "@/app/(you)/cart/(components)/add-to-cart";
import { Accordion } from "@/components/Accordion/Accordion";
import Link from "next/link";
import { LikeButton } from "@/components/ItemCard/LikeButton";
import { ShareButton } from "@/components/ShareButton";
import { SizesPicker } from "./SizesPicker";
import { ItemSuccess } from "../item";
import { useState } from "react";

export function ItemData({ data }: { data: ItemSuccess }) {
  const [selectedSize, setSelectedSize] = useState<
    ItemSuccess["sizes"][number]
  >(data.sizes.filter((size) => size.available)[0]);
  // const [selectedColor, setSelectedColor] = useState<a
  //   ItemSuccess["colors"][number]
  // >(data.colors[0] ?? null);

  return (
    <div className="ItemData">
      <div className="item-data__wrapper">
        <h2 className="item-data__title">{data.name}</h2>
        <p className="item-data__brand">
          By{" "}
          <Link
            className="brand-link flex items-center gap-1"
            href={`/brands/${data.brand.name}`}
          >
            {data.brand.label ?? data.brand.name}
            {data.brand.isPartneredBrand && (
              <svg
                className="h-4 w-4 flex-shrink-0 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </Link>
        </p>
        <div className="flex gap-2">
          <p
            className={`item-data__price ${data.highestPrice ? "text-red-500" : ""}`}
          >
            LE {data.price.toLocaleString()}.00
          </p>
          {data.highestPrice && (
            <p className="item-data__price line-through">
              LE {data.highestPrice?.toLocaleString()}.00
            </p>
          )}
        </div>
        {data.lowestPrice && (
          <p className="item-data__price">
            Lowest price: LE {data.lowestPrice?.toLocaleString()}.00
          </p>
        )}
      </div>

      <Flex direction={"column"} gap={"4"}>
        <Flex direction={"row"} gap={"2"}>
          <LikeButton
            id={data.id}
            className={"ItemPage_Button"}
            item={{
              id: data.id,
              name: data.name,
              price: data.price,
              brand: data.brand,
              image: data.images[0],
              isSoldOut: false,
            }}
          />
          <ShareButton
            id={data.id}
            name={data.name}
            description={data.description}
            className={"ItemPage_Button"}
          />
        </Flex>

        <SizesPicker
          data={data}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />

        <div className="action-buttons-wrapper">
          <AddToCart
            data={data}
            selectedColor={null}
            selectedSize={selectedSize}
          />
        </div>

        {data.description && data.description.length > 0 && (
          <Accordion trigger={"Description"}>{data.description}</Accordion>
        )}

        {/* <div>
          <div className="sizes-title">Colors</div>
          <div className="mt-2 flex flex-wrap gap-1">
            {data.colors.map((color, index) => (
              <label
                key={index}
                className={`relative h-6 w-6 cursor-pointer rounded-full transition-all duration-200 ${
                  selectedColor.id === color.id
                    ? "scale-105 shadow-sm ring-1 ring-black ring-offset-1"
                    : "hover:ring-offset-0.5 hover:scale-102 hover:ring-1 hover:ring-gray-400"
                }`}
                style={{ backgroundColor: color.name }}
                onClick={() => setSelectedColor(color)}
              >
                <input
                  type="radio"
                  name="color"
                  value={color.id}
                  checked={selectedColor.id === color.id}
                  onChange={() => setSelectedColor(color)}
                  className="sr-only"
                />
                {selectedColor.id === color.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-3 w-3 items-center justify-center rounded-full bg-white/20">
                      <svg
                        className="h-1.5 w-1.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </label>
            ))}
          </div>
        </div> */}

        <div>
          <div className="sizes-title">Material</div>
          <div className="item-info">{data.material}</div>
        </div>
        <div>
          <div className="sizes-title">Gender</div>
          <div className="item-info">{data.gender}</div>
        </div>
      </Flex>
    </div>
  );
}
