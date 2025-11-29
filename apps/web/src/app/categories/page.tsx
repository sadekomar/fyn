"use client";

import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "@/api/endpoints";
import { clientHttp } from "@/lib/queries/http.service";
import {
  CategoryNode,
  ReadCategoriesResponse,
} from "./[...category]/(utils)/category-types";
import Link from "next/link";

// export const metadata = {
//   title: "All Categories - Clyo",
//   description:
//     "Find everything you need on Clyo Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
//   robots:
//     "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
//   keywords: "Clyo Cairo, Local Brands, Fashion Brands, Egyptian Local Brands",
//   openGraph: {
//     title: "All Categories - Clyo",
//     description:
//       "Find everything you need on Clyo Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
//     type: "website",
//   },
//   twitter: {
//     card: "summary",
//     title: "All Categories - Clyo",
//     description:
//       "Find everything you need on Clyo Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
//   },
// };

function renderCategoryNodes(
  categories: CategoryNode[] = [],
  level: number = 0,
) {
  return categories.map((category) => (
    <div key={`/categories/${category.slug}`} className="mb-2">
      <Link
        href={`/categories/${category.slug}`}
        className={`block rounded-lg border border-transparent p-3 transition-all duration-200 hover:border-gray-200 hover:bg-gray-50 hover:shadow-sm ${
          level === 0
            ? "bg-white text-lg font-semibold text-gray-900 shadow-sm"
            : level === 1
              ? "bg-gray-50 text-base font-medium text-gray-800"
              : "bg-gray-100 text-sm text-gray-700"
        }`}
      >
        <h1
          className={`${level === 0 ? "text-xl" : level === 1 ? "text-lg" : "text-base"}`}
        >
          {category.name}
        </h1>
      </Link>
      {category.children && category.children.length > 0 && (
        <div
          className={`mt-2 ml-6 space-y-1 ${level === 0 ? "border-l-2 border-gray-200 pl-4" : level === 1 ? "border-l border-gray-300 pl-3" : "pl-2"}`}
        >
          {renderCategoryNodes(category.children, level + 1)}
        </div>
      )}
    </div>
  ));
}

export default function AllCategoriesPage() {
  const { data = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      clientHttp.get<CategoryNode[]>(Endpoints.Categories, {
        isResponseJson: true,
        isServer: false,
        isDataJson: true,
      }),
  });

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
        All Categories
      </h1>
      <div className="space-y-3">{renderCategoryNodes(data)}</div>
    </div>
  );
}
// const searchParams = await props.searchParams;

// function generateCategoryLink(categoryLink: string) {
//   let genderParam;
//   const noGenderSpecified = !searchParams.gender;
//   if (noGenderSpecified) {
//     return categoryLink;
//   }
//   if (categoryLink.includes("?")) {
//     genderParam = `&genders=${searchParams.gender}`;
//   } else {
//     genderParam = `?genders=${searchParams.gender}`;
//   }
//   return categoryLink + genderParam;
// }

// function generateCategoryImage(category: {
//   image: any;
//   description?: string;
//   term: any;
//   link?: string;
//   display_item?: string;
//   display_item_link?: string;
//   women_only?: boolean | undefined;
// }) {
//   let genderParam;
//   const noGenderSpecified = !searchParams.gender;
//   if (noGenderSpecified) {
//     return category.image;
//   }
//   if (searchParams.gender == "men,unisex") {
//     return `/categories/${category.term}-men.webp`;
//   }
//   if (searchParams.gender === "women,unisex") {
//     return `/categories/${category.term}-women.webp`;
//   }
// }

// function isCategoryCompatibleWithGender(category: {
//   image: string;
//   description: string;
//   term: string;
//   link: string;
//   display_item: string;
//   display_item_link: string;
//   women_only?: boolean;
// }) {
//   const userInMenCategories = searchParams.genders == "men,unisex";

//   if ("women_only" in category && userInMenCategories) {
//     return false;
//   }
//   return true;
// }

// return (
//   <>
//     <CategoriesComponent
//       isCategoryCompatibleWithGender={isCategoryCompatibleWithGender}
//       generateCategoryLink={generateCategoryLink}
//       generateCategoryImage={generateCategoryImage}
//     />
//   </>
// );
