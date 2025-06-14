"use client";

import "./CategoryPage.css";

import { GridLayout } from "@/layouts/GridLayout/GridLayout";
import { ColorPills } from "@/app/(home)/(components)/color-pills";

import { allCategoriesData } from "@/data/categories";
import { FiltersAndCount } from "@/components/FiltersAndCount/FiltersAndCount";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategoryItems, getCategoryMetadata } from "./(utils)/read-category";
import { useParams, useSearchParams } from "next/navigation";
import { LoomImage } from "@/components/LoomImage";
import { PaginationControl } from "@/components/Pagination/PaginationControl";

export function CategoryPageClient() {
  const { category } = useParams<{ category: string }>();
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();
  const queryStringArray = Array.from(searchParams.entries());

  const { data } = useQuery({
    queryKey: ["/category", category, ...queryStringArray],
    queryFn: () => getCategoryItems(category, queryString, false),
  });

  const removeSpaces = (category: string) => {
    const categoryWithoutSpaces = category.replace("%20", " ");
    console.log("categoryWithoutSpaces", categoryWithoutSpaces);
    return categoryWithoutSpaces;
  };

  const categoryData =
    allCategoriesData[removeSpaces(category) as keyof typeof allCategoriesData];

  const { data: metadata } = useQuery({
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
        <LoomImage src={categoryData.image} alt={categoryData.description} />
        <div className="category-page-title-wrapper">
          <h2 className="category-page-title">{categoryData.term}</h2>
        </div>
      </div>

      <ColorPills metadata={metadata} />
      <FiltersAndCount metadata={metadata} />
      <GridLayout items={data} />
      <PaginationControl metadata={metadata} />
    </>
  );
}
