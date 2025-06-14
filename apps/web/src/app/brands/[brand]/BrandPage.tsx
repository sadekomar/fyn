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

import { FollowButton } from "@/components/FollowButton/FollowButton";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { clientHttp } from "@/lib/queries/http.service";
import { BrandsList } from "@/lib/types";
import {
  getBrand,
  getBrandCategories,
  getBrandItems,
  getBrandMetadata,
} from "./(utils)/read-brand";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Endpoints } from "@/api/endpoints";
import { AddBrandView } from "./(components)/add-brand-view";

export function BrandPageClient() {
  const { brand } = useParams<{ brand: brandKey }>();
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();
  const queryStringArray = Array.from(searchParams.entries());

  const { data: brandData } = useQuery({
    queryKey: ["/brand", brand],
    queryFn: () => getBrand(brand, false),
  });
  const { data: brandsList } = useQuery({
    queryKey: ["brands-list"],
    queryFn: () => clientHttp.get<BrandsList>(Endpoints.Brands),
  });
  const { data } = useQuery({
    queryKey: ["/brand-items", brand, ...queryStringArray],
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

  const { previousBrand, nextBrand } = getPreviousNextBrands(brand, brandsList);

  return (
    <>
      <div className="brand-page-wrapper">
        <BrandsNavigator params={{ brand }} brandsList={brandsList} />

        <div className="BrandImageContainer">
          {brandData && (
            <LoomImage
              src={brandData.image ?? undefined}
              className={`BrandImage`}
              alt={brandData.name}
              fetchPriority="high"
              loading="eager"
            />
          )}
          <div className="BrandContainer">
            <div>
              <div className="brand-info-wrapper">
                <h2 className="brand-name">{brandData?.name}</h2>
                <FollowButton className={"follow-button-white"} brand={brand} />
              </div>
              <BrandDescription brand={brand} />
            </div>
            <div className="flex gap-4">
              <Link
                className="brand-nav-button"
                href={`/brands/${previousBrand?.name}`}
                prefetch={true}
              >
                <ChevronLeft width="25px" height="25px" /> Previous Brand
              </Link>
              <Link
                className="brand-nav-button"
                href={`/brands/${nextBrand?.name}`}
                prefetch={true}
              >
                Next Brand <ChevronRight width="25px" height="25px" />
              </Link>
            </div>
          </div>
        </div>

        <CategorySelector brandCategories={brandCategories} />
        <FiltersAndCount metadata={metadata} />
        <GridLayout items={data} />
        <PaginationControl metadata={metadata} />
        <AddBrandView brand={brand} />
      </div>
    </>
  );
}

function getPreviousNextBrands(
  brand: string,
  brandsList: BrandsList | undefined,
) {
  const currentBrand = brand.replace(/%20/g, " ");
  const currentBrandIndex = brandsList?.findIndex(
    (brand) => brand.name === currentBrand,
  );
  if (currentBrandIndex === undefined) {
    return { previousBrand: null, nextBrand: null };
  }
  const nextBrand =
    brandsList?.[
      (currentBrandIndex + 1 + brandsList.length) % brandsList.length
    ];
  const previousBrand =
    brandsList?.[
      (currentBrandIndex - 1 + brandsList.length) % brandsList.length
    ];

  return { previousBrand, nextBrand };
}
