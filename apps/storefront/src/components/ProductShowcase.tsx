"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { useState } from "react";

const products = [
  {
    id: "savi",
    name: "SAVI",
    price: "LE 1,800.00",
    image: "/nagskin-assets/savi.jpg",
  },
  {
    id: "magnolia",
    name: "MAGNOLIA",
    price: "LE 1,900.00",
    image: "/nagskin-assets/magnolia.jpg",
  },
  {
    id: "liri",
    name: "LIRI",
    price: "LE 2,800.00",
    image: "/nagskin-assets/liri.jpg",
  },
  {
    id: "zala",
    name: "ZALA",
    price: "LE 2,700.00",
    image: "/nagskin-assets/zala.jpg",
  },
];

export function ProductShowcase() {
  const [clickedProductId, setClickedProductId] = useState<string | null>(null);

  const handleProductClick = (productId: string) => {
    // Synchronously set viewTransitionName on clicked image and remove from others
    // This must happen before the view transition captures DOM state
    const allProductImages = document.querySelectorAll("[data-product-image]");
    allProductImages.forEach((img) => {
      const imgProductId = img.getAttribute("data-product-image");
      if (imgProductId === productId) {
        (img as HTMLElement).style.viewTransitionName =
          `product-image-${productId}`;
      } else {
        (img as HTMLElement).style.viewTransitionName = "none";
      }
    });

    setClickedProductId(productId);

    // Clean up after transition completes - reset viewTransitionNames for all product images
    setTimeout(() => {
      allProductImages.forEach((img) => {
        const imgProductId = img.getAttribute("data-product-image");
        (img as HTMLElement).style.viewTransitionName =
          `product-image-${imgProductId}`;
      });
    }, 500);
  };

  return (
    <>
      <section className="py-12 px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl">
            Hot Right Now
          </h2>
          <a href="#" className="text-sm hover:text-maroon transition-colors">
            Discover
          </a>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          {products.map((product) => {
            const isClicked = clickedProductId === product.id;

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group flex-shrink-0 gap-0"
                onClick={() => handleProductClick(product.id)}
                style={{
                  zIndex: isClicked ? 9999 : 1,
                  position: "relative",
                }}
              >
                <div className="relative h-[294px] w-[235px] mb-4 bg-beige overflow-hidden rounded-md transition-transform duration-300 hover:-translate-y-1">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="235px"
                    data-product-image={product.id}
                    style={{
                      viewTransitionName: `product-image-${product.id}`,
                    }}
                  />
                </div>
                <h3 className="text-sm font-medium mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.price}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
