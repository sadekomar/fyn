"use client";

import { heroImages } from "@/data/heroImages";

import { FiltersAndCount } from "@/components/FiltersAndCount/FiltersAndCount";
import { CategorySelector } from "@/components/CategorySelector/CategorySelector";
import { GridLayout } from "@/layouts/GridLayout/GridLayout";
import { PaginationControl } from "@/components/Pagination/PaginationControl";

import "./(components)/BrandPage.css";

import { BrandsNavigator } from "./(components)/BrandsNavigator";
import { LoomImage } from "@/components/LoomImage";
import { BrandDescription, brandKey } from "./(components)/BrandDescription";
import { NextPrevButtons } from "./(components)/NextPrevButtons";

import { FollowButton } from "@/components/FollowButton/FollowButton";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { HttpMethods, httpService } from "@/queries/http.service";
import { BrandsList } from "@/types";
import {
  getBrandCategories,
  getBrandItems,
  getBrandMetadata,
} from "./(utils)/read-brand";
import { getCategoryMetadata } from "@/app/categories/[category]/(utils)/read-category";

export async function generateMetadata(props: { params: { brand: string } }) {
  const params = await props.params;
  const brand = params.brand.replaceAll("%20", " ");

  return {
    title: brand,
    openGraph: {
      title: brand,
      description:
        "Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
      type: "website",
    },
  };
}

export function BrandPageClient() {
  const { brand } = useParams<{ brand: brandKey }>();
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();
  const queryStringArray = Array.from(searchParams.entries());

  const { data: brandsList } = useQuery({
    queryKey: ["brands-list"],
    queryFn: () => httpService<BrandsList>(HttpMethods.GET, "/brands"),
  });

  const { data } = useQuery({
    queryKey: ["/brand", brand, ...queryStringArray],
    queryFn: () => getBrandItems(brand, queryString, false),
  });

  const { data: metadata } = useQuery({
    queryKey: [
      "/brand-metadata",
      brand,
      ...queryStringArray.filter(([key]) => key !== "page"),
    ],
    queryFn: () => getBrandMetadata(brand, queryString, false),
  });

  const { data: brandCategories } = useQuery({
    queryKey: ["/brand-categories", brand],
    queryFn: () => getBrandCategories(brand, false),
  });

  const coverImage = "";

  function getHeroImage() {
    if (heroImages[brand]) {
      let displayImage = heroImages[brand];
      displayImage.replace("loom-image-dimensions", "300");
      return displayImage;
    } else {
      if (coverImage) {
        return coverImage["src"];
      }
    }
  }

  return (
    <>
      <div className="brand-page-wrapper">
        <BrandsNavigator params={{ brand }} brandsList={brandsList} />

        <div className="BrandImageContainer">
          <LoomImage src={getHeroImage()} className={`BrandImage`} />
          <div className="BrandContainer">
            <div>
              <div className="brand-info-wrapper">
                <h2 className="brand-name">{brand.replaceAll("%20", " ")}</h2>
                <FollowButton className={"follow-button-white"} brand={brand} />
              </div>
              <BrandDescription brand={brand} />
            </div>
            <NextPrevButtons brandsList={brandsList} />
          </div>
        </div>

        <CategorySelector brandCategories={brandCategories} />
        <FiltersAndCount metadata={metadata} />
        <GridLayout items={data} />
        <PaginationControl metadata={metadata} />
      </div>
    </>
  );
}
