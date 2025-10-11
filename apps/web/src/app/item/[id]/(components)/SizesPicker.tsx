"use client";

import { ItemSuccess } from "../item";

export function SizesPicker({
  data,
  selectedSize,
  setSelectedSize,
}: {
  data: ItemSuccess;
  selectedSize: ItemSuccess["sizes"][number] | undefined;
  setSelectedSize: (size: ItemSuccess["sizes"][number]) => void;
}) {
  return (
    <div>
      <p className="sizes-title">Sizes and Colors</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {data.sizes.map((size, index) => (
          <label
            key={index}
            className={`relative cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
              size.available
                ? selectedSize?.id == size.id
                  ? "scale-105 bg-black text-white shadow-md ring-1 ring-black ring-offset-1"
                  : "bg-gray-100 text-gray-900 hover:scale-102 hover:bg-gray-200"
                : "cursor-not-allowed bg-gray-50 text-gray-400 opacity-50"
            } `}
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
              <div className="absolute -top-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-black">
                <svg
                  className="h-2 w-2 text-white"
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
