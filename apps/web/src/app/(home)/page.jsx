import Link from "next/link";

import "./home.css";

import { Hero } from "./(Hero)/Hero";
import { BrandScroller } from "@/components/BrandScroller";
import { ShopByCategory } from "./(Categories)/ShopByCategory";
import { Brands } from "./(Brands)/Brands";
import { RecentlyViewed } from "../item/[id]/RecentlyViewed";
import { FollowedBrands } from "./FollowedBrands";
import { BrandOfTheDay } from "./BrandOfTheDay";

export const metadata = {
  title: "Loom Cairo: Shop 300 Local Fashion Brands in One Place",
  description:
    "Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
  robots:
    "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  keywords: "Loom Cairo, Local Brands, Fashion Brands, Egyptian Local Brands",
  openGraph: {
    title: "Loom Cairo: Shop 300 Local Fashion Brands in One Place",
    description:
      "Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Loom Cairo: Shop 300 Local Fashion Brands in One Place",
    description:
      "Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
  },
  alternates: {
    canonical: "https://loomcairo.com/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Brands />

      <BrandScroller title={"Latest from "} brand={"ausetia"} />
      <BrandOfTheDay brand={"juvenile"} />

      <ShopByGender />
      <ShopByCategory />
      <FollowedBrands />
      <RecentlyViewed />
    </>
  );
}

function ShopByGender() {
  return (
    <div className="gender-wrapper">
      <h3 className="genders-title">Shop by Gender</h3>
      <div className="genders">
        <Link href="/categories?gender=women,unisex" className="gender">
          <picture>
            <source
              srcSet="
                https://res.cloudinary.com/dffgye7z3/image/upload/w_480/v1725840213/women_lpshuo.avif  480w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_720/v1725840213/women_lpshuo.avif  720w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_1080/v1725840213/women_lpshuo.avif 1080w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_1440/v1725840213/women_lpshuo.avif 1440w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_1920/v1725840213/women_lpshuo.avif 1920w
              "
              type="image/avif"
            />
            <source
              srcSet="
                https://res.cloudinary.com/dffgye7z3/image/upload/w_480/v1725840213/women_lpshuo.webp  480w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_720/v1725840213/women_lpshuo.webp  720w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_1080/v1725840213/women_lpshuo.webp 1080w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_1440/v1725840213/women_lpshuo.webp 1440w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_1920/v1725840213/women_lpshuo.webp 1920w
              "
              type="image/webp"
            />
            <img
              src="https://res.cloudinary.com/dffgye7z3/image/upload/w_1080/v1725840213/women_lpshuo.webp"
              srcset="
                https://res.cloudinary.com/dffgye7z3/image/upload/w_480/v1725840213/women_lpshuo.webp  480w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_720/v1725840213/women_lpshuo.webp  720w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_1080/v1725840213/women_lpshuo.webp 1080w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_1440/v1725840213/women_lpshuo.webp 1440w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_1920/v1725840213/women_lpshuo.webp 1920w
                "
              alt="Women categories"
              loading="lazy"
              sizes="(max-width: 600px) 480px, (max-width: 1024px) 720px, (max-width: 1440px) 1080px, 1440px"
            />
          </picture>

          <div className="button-container">
            <button className="gender-button">Women</button>
          </div>
        </Link>
        <Link href="/categories?gender=men,unisex" className="gender">
          <picture>
            <source
              srcSet={`
                https://res.cloudinary.com/dffgye7z3/image/upload/w_480/v1725840214/men_ysf6jd.avif  480w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_720/v1725840214/men_ysf6jd.avif  720w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_1080/v1725840214/men_ysf6jd.avif 1080w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_1440/v1725840214/men_ysf6jd.avif 1440w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_1920/v1725840214/men_ysf6jd.avif 1920w
              `}
              type="image/avif"
            />
            <source
              srcSet={`
                https://res.cloudinary.com/dffgye7z3/image/upload/w_480/v1725840214/men_ysf6jd.webp  480w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_720/v1725840214/men_ysf6jd.webp  720w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_1080/v1725840214/men_ysf6jd.webp 1080w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_1440/v1725840214/men_ysf6jd.webp 1440w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_1920/v1725840214/men_ysf6jd.webp 1920w
              `}
              type="image/webp"
            />
            <img
              src="https://res.cloudinary.com/dffgye7z3/image/upload/w_1080/v1725840214/men_ysf6jd.jpg"
              srcSet={`
                https://res.cloudinary.com/dffgye7z3/image/upload/w_480/v1725840214/men_ysf6jd.jpg  480w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_720/v1725840214/men_ysf6jd.jpg  720w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_1080/v1725840214/men_ysf6jd.jpg 1080w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_1440/v1725840214/men_ysf6jd.jpg 1440w,
                https://res.cloudinary.com/dffgye7z3/image/upload/w_1920/v1725840214/men_ysf6jd.jpg 1920w
              `}
              alt="Men categories"
              loading="lazy"
              sizes="(max-width: 600px) 480px, (max-width: 1024px) 720px, (max-width: 1440px) 1080px, 1440px"
            />
          </picture>
          <div className="button-container">
            <button className="gender-button">Men</button>
          </div>
        </Link>
      </div>
    </div>
  );
}
