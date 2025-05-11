import Link from "next/link";

import { LetterNavigator } from "./LetterNavigator";
import { IPAddress } from "@/data/IPAddress";
import { IsometricBrands } from "@/app/(home)/(Brands)/IsometricBrands";
import "./AllBrands.css";
import { HttpMethods, httpService } from "@/queries/http.service";

export const metadata = {
  title: "All Brands",
  description:
    "Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
  robots:
    "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  keywords: "Loom Cairo, Local Brands, Fashion Brands, Egyptian Local Brands",
  openGraph: {
    title: "All Brands",
    description:
      "Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "All Brands",
    description:
      "Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
  },
};

export type BrandsAPI = {
  [key: string]: { id: string; name: string }[];
};

export default async function AllBrands() {
  const brands = await httpService<BrandsAPI>(HttpMethods.GET, "/brands", {
    isServer: true,
    isResponseJson: true,
  });

  console.log("brands", brands);

  return (
    <>
      <div>
        <LetterNavigator brands={brands} />

        <div className="all-brands-title-wrapper">
          <h2 className="all-brands-title">All Brands</h2>
          <IsometricBrands />
        </div>

        {Object.keys(brands).map((letter, index) => {
          return (
            <div key={index}>
              <a className="letter-label" href={`#${letter}`}>
                {letter}
              </a>
              <ul className="brands-container">
                {brands[letter].map(
                  (brand: { id: string; name: string }, index: number) => (
                    <li key={index} className="brandLink--li">
                      <Link
                        href={`/brands/${brand.name}`}
                        className="brandLink"
                      >
                        {brand.name}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
