"use client";

import "./CategoryPage.css";

import { GridLayout } from "@/layouts/GridLayout/GridLayout";
import { ColorPills } from "@/app/(home)/(ColorPills)/ColorPills";

import { newCategories } from "@/data/categories";
import { FiltersAndCount } from "@/components/FiltersAndCount/FiltersAndCount";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategoryItems, getCategoryMetadata } from "./(utils)/read-category";
import { useParams, useSearchParams } from "next/navigation";

export function CategoryPageClient() {
  const { category } = useParams<{ category: string }>();
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();
  const queryStringArray = Array.from(searchParams.entries());

  const { data } = useQuery({
    queryKey: ["/category", category, ...queryStringArray],
    queryFn: () => getCategoryItems(category, queryString, false),
  });

  const { data: metadata, isPending } = useQuery({
    queryKey: [
      "/category-metadata",
      category,
      ...queryStringArray.filter(([key]) => key !== "page"),
    ],
    queryFn: () => getCategoryMetadata(category, queryString, false),
  });

  return (
    <>
      <div className="category-page-header">
        <img
          src={newCategories[category]?.["image"] || ""}
          alt={newCategories[category]?.["description"] || ""}
        />
        <div className="category-page-title-wrapper">
          <h2 className="category-page-title">{category}</h2>
        </div>
      </div>

      <ColorPills metadata={metadata} />
      <FiltersAndCount metadata={metadata} />
      <GridLayout items={data} />
      {/* <PaginationControl metadata={metadata} /> */}
    </>
  );
}
