import { Suspense } from "react";
import Link from "next/link";

import "./(components)/ItemPage.css";
import "./(components)/ItemPagePlaceholder.css";

import { SimilarItems } from "./(components)/SimilarItems";

import { BrandScroller } from "@/app/item/[id]/(components)/BrandScroller";
import { ItemData } from "./(components)/ItemData";
import { HScrollerPlaceholder } from "@/layouts/HorizontalScroller/HScrollerPlaceholder";
import { DesktopImages } from "./(components)/DesktopImages";
import { serverHttp } from "@/lib/queries/http.service";
import { ItemCardsI } from "@/lib/types";
import { AddToRecentlyViewed } from "../AddToRecentlyViewed";
import type { Metadata } from "next";
import { ImageSlider } from "./(components)/image-slider";
import { ItemPageResponse } from "@/app/item/[id]/item";
import { RecentlyViewed } from "./(components)/RecentlyViewed";
import { ReadLikeResponse } from "@/app/(you)/likes/(utils)/like-types";
import { getCurrentUser } from "@/lib/auth";
import { getIdQuery } from "@/app/(utils)/utils";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Endpoints } from "@/api/endpoints";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await serverHttp.get<ItemPageResponse>(`/item/${id}`);

  if (data.status === "error") {
    return {
      title: "Item not found",
    };
  }

  return {
    title: data?.name,
    images: data?.images[0],
    description: data?.description.slice(0, 60),
    robots:
      "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
    keywords:
      "Univyr Cairo, Local Brands, Fashion Brands, Egyptian Local Brands",
    openGraph: {
      title: data?.name,
      images: data?.images[0],
      description: data?.description.slice(0, 60),
      type: "website",
      url: `https://univyr.com/item/${id}`,
    },
    twitter: {
      card: "summary",
      title: data?.name,
      images: data?.images[0],
      description: data?.description.slice(0, 60),
    },
    alternates: {
      canonical: `https://univyr.com/item/${id}`,
    },
  } as Metadata;
}

export default async function ItemPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const data = await serverHttp.get<ItemPageResponse>(`/item/${id}`);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["likes"],
    queryFn: async () => {
      const { id, type } = await getCurrentUser();
      return serverHttp.get<ItemCardsI[]>(
        `${Endpoints.Likes}?type=${type}&${getIdQuery(id!, type)}`,
      );
    },
  });

  if (data.status === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--clr-neutral-100)] p-8">
        <div className="text-[var(--clr-loom-lilac)] text-[var(--fs-1000)]">
          🔍
        </div>
        <div className="max-w-[var(--grid-max-width)] space-y-4 text-center">
          <h1 className="font-[var(--fw-bold)] text-[var(--clr-neutral-900)] text-[var(--fs-800)]">
            Oops! Item Not Found
          </h1>
          <p className="text-[var(--clr-gray-text)] text-[var(--fs-400)]">
            Looks like this item has gone on a little adventure! Maybe it&apos;s
            exploring the fashion universe? 🌌
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-[var(--border-radius)] bg-[var(--clr-loom-lilac)] px-6 py-3 font-[var(--fw-regular)] text-white transition-all duration-300 hover:bg-[var(--clr-loom-lilac-900)]"
        >
          <span>Take Me Home</span>
          <span className="text-[var(--fs-500)]">🏠</span>
        </Link>
      </div>
    );
  }

  const category = data.categories[0];
  const color = data.colors[0];
  const gender = data.gender;

  return (
    <>
      <ImageSlider images={data.images} />
      <div className="ItemGrid">
        <DesktopImages data={data} />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ItemData data={data} />
        </HydrationBoundary>
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

      {data.brand && (
        <Suspense fallback={<HScrollerPlaceholder />}>
          <BrandScroller brand={data?.brand?.name} title={"More from "} />
        </Suspense>
      )}

      <Suspense fallback={<HScrollerPlaceholder />}>
        <RecentlyViewed />
      </Suspense>
      <AddToRecentlyViewed itemId={id} />
    </>
  );
}
