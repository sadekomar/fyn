"use client";

import { useState } from "react";
import { ItemPageI } from "@/lib/types";

export function SizesPicker({ data }: { data: ItemPageI }) {
  const [selectedColor, setSelectedColor] = useState<string>("black");
  console.log(data);

  return (
    <div>
      <p className="sizes-title">Sizes and Colors</p>
      <div className="sizes-wrapper">
        {data.sizes.map((size, index) => (
          <label
            key={index}
            className={`size-badge ${size.available ? "size-badge-available" : ""} ${selectedColor == size.name ? "size-badge-selected" : ""}`}
          >
            <input
              type="radio"
              name="size"
              value={size.name}
              disabled={!size.available}
              onChange={(e) => setSelectedColor(e.target.value)}
              checked={selectedColor === size.name}
              style={{ display: "none" }}
            />
            {size.name}
          </label>
        ))}
      </div>
    </div>
  );
}
