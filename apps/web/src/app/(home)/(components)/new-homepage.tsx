"use client";

import Link from "next/link";
import { LoomImage } from "@/components/LoomImage";
import "./home.css";

import { Hero } from "./hero";
import { Brands } from "./brands";
import { HorizontalScroller } from "@/layouts/HorizontalScroller/HorizontalScroller";
import { clientHttp } from "@/lib/queries/http.service";
import { ItemCardsI } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { conifg } from "../utils";
import FestivalFashion from "./festival-fashion";
import HeroByV0 from "./hero-by-v0";

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
    <div className="space-y-12 pb-12">
      {/* <HeroExperimentPage /> */}
      {/* Fashion Editorial Hero Section */}
      <section className="relative h-[95vh] min-h-[800px] bg-black overflow-hidden">
        {/* Background Image with Dynamic Overlay */}
        <div className="absolute inset-0">
          <LoomImage
            src="/dreamy.webp"
            alt="Fashion editorial"
            className="object-cover w-full h-full"
            width={1920}
            height={1080}
            loading="eager"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col justify-end h-full pb-32">
            {/* Main Content */}
            <div className="max-w-2xl">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium tracking-wider uppercase">
                  New Season
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                Define Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-400">
                  Style
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-xl">
                Discover the perfect blend of contemporary design and timeless
                elegance. Where every piece tells your story.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/categories"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-none text-white bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  Shop the Drop
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
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
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm py-8">
              <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-light text-white mb-2">
                      300+
                    </div>
                    <div className="text-sm text-gray-300 tracking-widest uppercase">
                      Local Brands
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-light text-white mb-2">
                      17,000+
                    </div>
                    <div className="text-sm text-gray-300 tracking-widest uppercase">
                      Curated Pieces
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-light text-white mb-2">
                      24/7
                    </div>
                    <div className="text-sm text-gray-300 tracking-widest uppercase">
                      Style Support
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-light text-white mb-2">
                      100%
                    </div>
                    <div className="text-sm text-gray-300 tracking-widest uppercase">
                      Local Fashion
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
              <div className="flex flex-col items-center text-white/30">
                <span className="text-xs tracking-widest uppercase mb-2">
                  Scroll to explore
                </span>
                <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <HeroByV0 />
      <FestivalFashion items={featuredBrands} />
      {/* Featured Brands Section */}
      <section className="px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link href="/brands/featured">
                <h2 className="text-2xl font-bold hover:text-gray-600 transition-colors">
                  Featured Brands
                </h2>
              </Link>
              <p className="text-gray-600 mt-1">
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
      <section className="px-4 md:px-6 lg:px-8 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link href={`/brands/${conifg.latestFromBrand.value}`}>
                <h2 className="text-2xl font-bold hover:text-gray-600 transition-colors">
                  Latest from {conifg.latestFromBrand.label}
                </h2>
              </Link>
              <p className="text-gray-600 mt-1">
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
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  Brand of the Day: {conifg.brandOfTheDay.label}
                </h2>
                <p className="text-gray-600 mt-1">
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
      <section className="px-4 md:px-6 lg:px-8 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link href="/trending">
                <h2 className="text-2xl font-bold hover:text-gray-600 transition-colors">
                  Trending Now
                </h2>
              </Link>
              <p className="text-gray-600 mt-1">
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
        <div className="max-w-7xl mx-auto">
          <Hero />
        </div>
      </section>
      <Brands />
    </div>
  );
}
