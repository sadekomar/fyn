"use client";

import "./CategorySelector.css";

import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { CategoriesI } from "@/lib/types";
import { CardImage } from "../card-image";

export function CategorySelector({
  brandCategories,
}: {
  brandCategories: CategoriesI[] | undefined;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("categories");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      params.set("page", "1");
      return params.toString();
    },
    [searchParams],
  );

  const deleteCategory = (name: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(name);
    return params.toString();
  };

  function toggleCategory(category: string) {
    if (currentCategory == category) {
      setSelectedCategory(null);
      const newParams = deleteCategory("categories");
      window.history.pushState(null, "", `?${newParams}`);
    } else {
      setSelectedCategory(category);
      window.history.pushState(
        null,
        "",
        `?${createQueryString("categories", category)}`,
      );
    }
  }

  if (!brandCategories)
    return (
      <div className="category-selector-scroller">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="category-selector-wrapper animate-pulse">
            <div className="h-16 w-16 rounded-full bg-gray-200" />
            <div className="mt-2 h-6 w-24 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    );

  return (
    <div className="category-selector-scroller">
      {brandCategories.map((categoryObject, index) => (
        <div
          className="category-selector-wrapper"
          key={index}
          onClick={() => {
            toggleCategory(categoryObject.name);
          }}
        >
          <CardImage
            className="category-selector__img"
            src={categoryObject.image}
            alt={categoryObject.name}
          />
          <button
            className={`category-selector__button ${categoryObject.name === selectedCategory ? "category-selector__button-selected" : ""}`}
          >
            {categoryObject.name} ({categoryObject.count})
          </button>
        </div>
      ))}
    </div>
  );
}
