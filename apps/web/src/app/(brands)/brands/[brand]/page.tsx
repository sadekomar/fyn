import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Suspense } from "react";

import { heroImages } from "@/data/heroImages";
import { IPAddress } from "@/data/IPAddress";
import { revalidatePath } from "next/cache";

import { FiltersAndCount } from "@/components/FiltersAndCount/FiltersAndCount";
import { CategorySelector } from "@/components/CategorySelector/CategorySelector";
import { GridLayout } from "@/layouts/GridLayout/GridLayout";
import { PaginationControl } from "@/components/Pagination/PaginationControl";

import "./BrandPage.css";
// import '../SearchPage/SearchPage.css'

import { BrandsNavigator } from "./BrandsNavigator";
import { LoomImage } from "./LoomImage";
import { BrandDescription } from "./BrandDescription";
import { BrandProducts } from "./BrandProducts";
import { NextPrevButtons } from "./NextPrevButtons";

import { FollowButton } from "@/components/FollowButton/FollowButton";

export async function generateMetadata({ params, searchParams }) {
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

export default async function BrandPage({ params, searchParams }) {
  const brand = params.brand;
  const coverImage = "";

  const response = await fetch(`${IPAddress}/brands-list`);
  const brandsList = await response.json();

  async function revalidateServerData() {
    "use server";
    revalidatePath(`/brands/${params.brand}`);
  }

  const fetchData = async (brand) => {
    const searchParamsObject = new URLSearchParams(searchParams);
    const response = await fetch(
      `${IPAddress}/search?brand=${brand}&${searchParamsObject.toString()}`,
    );
    return response.json();
  };

  const fetchMetadata = async (brand) => {
    const searchParamsObject = new URLSearchParams(searchParams);
    const metadataResponse = await fetch(
      `${IPAddress}/metadata?brand=${brand}&${searchParamsObject.toString()}`,
    );
    return metadataResponse.json();
  };

  let data, metadata;

  [data, metadata] = await Promise.all([
    fetchData(params["brand"]),
    fetchMetadata(params["brand"]),
  ]);

  function getHeroImage() {
    if (heroImages[params.brand]) {
      let displayImage = heroImages[params.brand];
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
        <BrandsNavigator params={params} brandsList={brandsList} />

        <div className="BrandImageContainer">
          <LoomImage src={getHeroImage()} />
          <div className="BrandContainer">
            <div>
              <div className="brand-info-wrapper">
                <h2 className="brand-name">
                  {params.brand.replaceAll("%20", " ")}
                </h2>
                <FollowButton
                  className={"follow-button-white"}
                  brand={params.brand}
                />
              </div>
              <BrandDescription brand={brand} />
            </div>
            <NextPrevButtons
              brandsList={brandsList}
              params={params}
              searchParams={searchParams}
            />
          </div>
        </div>

        <CategorySelector metadata={metadata} />
        <FiltersAndCount metadata={metadata} />
        <GridLayout items={data} />
        <PaginationControl metadata={metadata} />
      </div>
    </>
  );
}
