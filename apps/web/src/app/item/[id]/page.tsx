import { Suspense } from "react";

import "./ItemPage.css";
import "./ItemPagePlaceholder.css";

import { SnapScroller } from "@/components/SnapScroller/SnapScroller";
import { RecentlyViewed } from "./RecentlyViewed";
import { SimilarItems } from "./SimilarItems";

import { BrandScroller } from "@/app/item/[id]/(components)/BrandScroller";
import { ItemData } from "./ItemData";
import { HScrollerPlaceholder } from "@/layouts/HorizontalScroller/HScrollerPlaceholder";
import { DesktopImages } from "./DesktopImages";
import { serverHttp } from "@/lib/queries/http.service";
import { ItemPageI } from "@/lib/types";
import { AddToRecentlyViewed } from "../AddToRecentlyViewed";
import type { Metadata } from "next";
import ImageSlider from "@/app/item/image-slider";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await serverHttp.get<ItemPageI>(`/item/${id}`);

  return {
    title: data.name,
    images: data.images[0],
    description: data.description.slice(0, 60),
    robots:
      "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
    keywords: "Loom Cairo, Local Brands, Fashion Brands, Egyptian Local Brands",
    openGraph: {
      title: data.name,
      images: data.images[0],
      description: data.description.slice(0, 60),
      type: "website",
      url: `https://loomcairo.com/item/${id}`,
    },
    twitter: {
      card: "summary",
      title: data.name,
      images: data.images[0],
      description: data.description.slice(0, 60),
    },
    alternates: {
      canonical: `https://loomcairo.com/item/${id}`,
    },
  } as Metadata;
}

export default async function ItemPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const data = await serverHttp.get<ItemPageI>(`/item/${id}`);

  const category = data.categories[0];
  const color = data.colors[0];
  const gender = data.gender;

  return (
    <>
      <ImageSlider images={data.images} />
      <div className="ItemGrid">
        <DesktopImages data={data} />
        <ItemData data={data} />
      </div>

      <Suspense
        fallback={
          <div className="gray-section-wrapper">
            <HScrollerPlaceholder />
          </div>
        }
      >
        <SimilarItems category={category} color={color?.name} gender={gender} />
      </Suspense>

      <Suspense fallback={<HScrollerPlaceholder />}>
        <BrandScroller brand={data["brand"]} title={"More from "} />
      </Suspense>

      {/* <Suspense fallback={<HScrollerPlaceholder />}>
        <RecentlyViewed />
      </Suspense> */}
      <AddToRecentlyViewed id={id} />
    </>
  );
}

function PhoneImages({
  data,
  height = "440px",
}: {
  data: ItemPageI;
  height?: string;
}) {
  return (
    <div className="ItemImagePhoneDisplay">
      <SnapScroller images={data.images} height={height} />
    </div>
  );
}
