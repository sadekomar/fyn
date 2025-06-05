"use client";

import { ItemPageI } from "@/lib/types";

export function SizesPicker({
  data,
  selectedSize,
  setSelectedSize,
}: {
  data: ItemPageI;
  selectedSize: ItemPageI["sizes"][number] | undefined;
  setSelectedSize: (size: ItemPageI["sizes"][number]) => void;
}) {
  return (
    <div>
      <p className="sizes-title">Sizes and Colors</p>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {data.sizes.map((size, index) => (
          <label
            key={index}
            className={`
              relative px-3 py-1.5 rounded-md font-medium text-xs
              transition-all duration-200 cursor-pointer
              ${
                size.available
                  ? selectedSize?.id == size.id
                    ? "bg-black text-white shadow-md scale-105 ring-1 ring-offset-1 ring-black"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900 hover:scale-102"
                  : "bg-gray-50 text-gray-400 cursor-not-allowed opacity-50"
              }
            `}
          >
            <input
              type="radio"
              name="size"
              value={size.name}
              disabled={!size.available}
              onChange={() => setSelectedSize(size)}
              checked={selectedSize?.id == size.id}
              className={`sr-only`}
            />
            {size.name}
            {selectedSize?.id == size.id && size.available && (
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-black rounded-full flex items-center justify-center">
                <svg
                  className="w-2 h-2 text-white"
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
            )}
          </label>
        ))}
      </div>
    </div>
  );
}
