"use client";

import "./CategorySelector.css";

import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export function CategorySelector({ metadata }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      params.set("page", 1);
      return params.toString();
    },
    [searchParams],
  );

  function toggleCategory(category) {
    if (currentCategory == category) {
      setSelectedCategory("all");
      window.history.pushState(
        null,
        "",
        `?${createQueryString("category", "all")}`,
      );
    } else {
      setSelectedCategory(category);
      window.history.pushState(
        null,
        "",
        `?${createQueryString("category", category)}`,
      );
    }
  }

  return (
    <div className="category-selector-scroller">
      {metadata["categories"].map((categoryObject, index) => (
        <div
          className="category-selector-wrapper"
          key={index}
          onClick={() => {
            toggleCategory(categoryObject.category);
          }}
        >
          <img
            className="category-selector__img"
            src={categoryObject.image}
            alt={categoryObject.category}
          />
          <button
            className={`category-selector__button ${categoryObject.category === selectedCategory ? "category-selector__button-selected" : ""}`}
          >
            {categoryObject.category} ({categoryObject.count})
          </button>
        </div>
      ))}
    </div>
  );
}
