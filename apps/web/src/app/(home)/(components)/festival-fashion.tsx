import Link from "next/link";
import { Heart, ArrowRight, ArrowUpRight } from "lucide-react";
import { ItemCardsI } from "@/lib/types";
import { LoomImage } from "@/components/LoomImage";
import { HorizontalScroller } from "@/layouts/HorizontalScroller/HorizontalScroller";

export default function FestivalFashion({
  items,
}: {
  items: ItemCardsI[] | undefined;
}) {
  if (!items) return null;
  // Take first 4 items for the grid
  const displayItems = items.slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-[#b2b725] relative overflow-hidden">
        <div className="container mx-auto grid md:grid-cols-2 gap-4">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="max-w-md">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">
                Daddy's Girl
              </h1>
              <p className="text-black mb-8 text-lg">
                Learning the craftship from their dad, they were determined to
                make it back into the industry after the loss of their Dad,
                continuing his 30 years old fashion business. The idea of the
                brand was brought out in memory of their beloved Dad.
              </p>
              <Link
                href="/categories?category=accessories"
                className="inline-flex items-center text-black font-medium text-lg"
              >
                Shop now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
          <LoomImage src={items[0].image} />
        </div>
      </div>
      {/* Products Grid */}
      <div className="bg-[#e9e75a] ">
        <HorizontalScroller items={items} />
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayItems.map((item) => (
              <Link
                key={item.id}
                href={`/item/${item.id}`}
                className="bg-gray-100 rounded-md overflow-hidden relative group"
              >
                <div className="absolute top-3 right-3 z-10">
                  <button
                    className="bg-white p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      // Add to wishlist logic here
                    }}
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
                <div className="relative h-60 md:h-72">
                  <LoomImage
                    src={item.image || "/placeholder.svg?height=300&width=300"}
                    alt={item.name}
                    width={300}
                    height={300}
                    className="object-contain h-full w-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{item.brand}</h3>
                  <p className="text-sm text-gray-700">{item.name}</p>
                  <div className="mt-2">
                    <span className="font-bold">
                      LE {item.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute right-4 bottom-4 flex flex-col gap-2">
          <Link
            href="/categories?category=accessories"
            className="bg-black p-2 text-white hover:bg-gray-800 transition-colors"
          >
            <ArrowUpRight className="h-5 w-5" />
          </Link>
          <Link
            href="/categories"
            className="bg-white border border-black p-2 hover:bg-gray-100 transition-colors"
          >
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
