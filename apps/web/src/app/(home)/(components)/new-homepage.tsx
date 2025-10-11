"use client";

import Link from "next/link";
import { LoomImage } from "@/components/LoomImage";
import "../home.css";

import { Brands } from "./brands";
import { HorizontalScroller } from "@/layouts/HorizontalScroller/HorizontalScroller";
import { clientHttp } from "@/lib/queries/http.service";
import { ItemCardsI } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { conifg } from "../utils";
import HeroByV0 from "./hero-by-v0";
import HeroExperimentPage from "./experiment";

export default function ClientHomePage() {
  const { data: latestBrandData } = useQuery({
    queryKey: ["latest-brand", conifg.latestFromBrand.value],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?brands=${conifg.latestFromBrand.value}&limit=20&sort_by=date-descending`,
      ),
  });

  const { data: brandOfTheDayData } = useQuery({
    queryKey: ["brand-of-the-day", conifg.brandOfTheDay.value],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?brands=${conifg.brandOfTheDay.value}&limit=20&sort_by=date-descending`,
      ),
  });

  const { data: trendingItems } = useQuery({
    queryKey: ["trending-items"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?limit=20&sort_by=popularity-descending`,
      ),
  });

  const { data: featuredBrands } = useQuery({
    queryKey: ["featured-brands"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?limit=20&sort_by=featured-descending`,
      ),
  });

  return (
    <div className="space-y-12">
      <LoomImage
        src="/model.webp"
        className="h-[320px] w-full object-cover object-[50%_20%]"
        alt="Fashion editorial"
      />
      Look no further
      {/* <HeroExperimentPage /> */}
      <div className="w-full overflow-hidden bg-neutral-900/60 py-3 backdrop-blur-md md:py-5">
        <div className="animate-marquee text-xs whitespace-nowrap text-neutral-400 sm:text-sm md:text-base">
          <span className="mx-3 md:mx-4">✨ Discover Local Gems</span>
          <span className="mx-3 md:mx-4"> Curated Collections </span>
          <span className="mx-3 md:mx-4"> Fashion-Forward Finds </span>
          <span className="mx-3 md:mx-4"> Support Small Brands </span>
          <span className="mx-3 md:mx-4"> Unique Styles Daily </span>
          <span className="mx-3 md:mx-4">Handcrafted Quality</span>
          {/* Repeated for smooth loop */}
          <span className="mx-3 md:mx-4">✨ Discover Local Gems</span>
          <span className="mx-3 md:mx-4"> Curated Collections </span>
          <span className="mx-3 md:mx-4"> Fashion-Forward Finds </span>
          <span className="mx-3 md:mx-4"> Support Small Brands </span>
          <span className="mx-3 md:mx-4"> Unique Styles Daily </span>
          <span className="mx-3 md:mx-4">Handcrafted Quality</span>
        </div>
      </div>
      {/* Fashion Editorial Hero Section */}
      <section className="relative h-[95vh] min-h-[800px] overflow-hidden bg-black">
        {/* Background Image with Dynamic Overlay */}
        <div className="absolute inset-0">
          <LoomImage
            src="/dreamy.webp"
            alt="Fashion editorial"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
            loading="eager"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative mx-auto h-full max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="flex h-full flex-col justify-end pb-32">
            {/* Main Content */}
            <div className="max-w-2xl">
              <div className="mb-6">
                <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium tracking-wider text-white uppercase backdrop-blur-sm">
                  New Season
                </span>
              </div>
              <h1 className="mb-6 text-5xl leading-[1.1] font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
                Define Your{" "}
                <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                  Style
                </span>
              </h1>
              <p className="mb-8 max-w-xl text-xl leading-relaxed text-gray-200 md:text-2xl">
                Discover the perfect blend of contemporary design and timeless
                elegance. Where every piece tells your story.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/categories"
                  className="group inline-flex items-center justify-center rounded-none border border-white/20 bg-white/10 px-8 py-4 text-lg font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                >
                  Shop the Drop
                  <svg
                    className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Stats Section */}
            <div className="absolute right-0 bottom-0 left-0 bg-black/40 py-8 backdrop-blur-sm">
              <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                  <div className="text-center">
                    <div className="mb-2 text-4xl font-light text-white">
                      300+
                    </div>
                    <div className="text-sm tracking-widest text-gray-300 uppercase">
                      Local Brands
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="mb-2 text-4xl font-light text-white">
                      17,000+
                    </div>
                    <div className="text-sm tracking-widest text-gray-300 uppercase">
                      Curated Pieces
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="mb-2 text-4xl font-light text-white">
                      24/7
                    </div>
                    <div className="text-sm tracking-widest text-gray-300 uppercase">
                      Style Support
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="mb-2 text-4xl font-light text-white">
                      100%
                    </div>
                    <div className="text-sm tracking-widest text-gray-300 uppercase">
                      Local Fashion
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 transform md:block">
              <div className="flex flex-col items-center text-white/30">
                <span className="mb-2 text-xs tracking-widest uppercase">
                  Scroll to explore
                </span>
                <div className="h-12 w-px bg-gradient-to-b from-white/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <HeroByV0 />
      {/* Featured Brands Section */}
      <section className="px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <Link href="/brands/featured">
                <h2 className="text-2xl font-bold transition-colors hover:text-gray-600">
                  Featured Brands
                </h2>
              </Link>
              <p className="mt-1 text-gray-600">
                Discover our handpicked selection of top brands
              </p>
            </div>
            <Link
              href="/brands/featured"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              View all →
            </Link>
          </div>
          <HorizontalScroller items={featuredBrands || []} />
        </div>
      </section>
      {/* Latest from Brand Section */}
      <section className="bg-gray-50 px-4 py-12 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <Link href={`/brands/${conifg.latestFromBrand.value}`}>
                <h2 className="text-2xl font-bold transition-colors hover:text-gray-600">
                  Latest from {conifg.latestFromBrand.label}
                </h2>
              </Link>
              <p className="mt-1 text-gray-600">
                Fresh arrivals from your favorite brand
              </p>
            </div>
            <Link
              href={`/brands/${conifg.latestFromBrand.value}`}
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              View all →
            </Link>
          </div>
          <HorizontalScroller items={latestBrandData || []} />
        </div>
      </section>
      {/* Brand of the Day Section */}
      {brandOfTheDayData && brandOfTheDayData.length > 0 && (
        <section className="px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  Brand of the Day: {conifg.brandOfTheDay.label}
                </h2>
                <p className="mt-1 text-gray-600">
                  Special spotlight on our featured brand
                </p>
              </div>
              <Link
                href={`/brands/${conifg.brandOfTheDay.value}`}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                View all →
              </Link>
            </div>
            <HorizontalScroller items={brandOfTheDayData} />
          </div>
        </section>
      )}
      {/* Trending Items Section */}
      <section className="bg-gray-50 px-4 py-12 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <Link href="/trending">
                <h2 className="text-2xl font-bold transition-colors hover:text-gray-600">
                  Trending Now
                </h2>
              </Link>
              <p className="mt-1 text-gray-600">
                What's hot and popular right now
              </p>
            </div>
            <Link
              href="/trending"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              View all →
            </Link>
          </div>
          <HorizontalScroller items={trendingItems || []} />
        </div>
      </section>
      {/* Original Hero Section */}
      <section className="px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl"></div>
      </section>
      <Brands />
    </div>
  );
}
