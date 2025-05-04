import Link from "next/link";

import { LetterNavigator } from "./LetterNavigator";
import { IPAddress } from "@/data/IPAddress";
import { IsometricBrands } from "@/app/(home)/(Brands)/IsometricBrands";
import "./AllBrands.css";

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

export default async function AllBrands() {
  const response = await fetch(
    `${IPAddress}/brands-list?group-alphabetically=1`,
  );
  const brands = await response.json();

  return (
    <>
      <div>
        <LetterNavigator brands={brands} />

        <div className="all-brands-title-wrapper">
          <h2 className="all-brands-title">All Brands</h2>
          <IsometricBrands />
        </div>

        {Object.keys(brands).map((initialLetter, index) => (
          <div key={index}>
            <a className="letter-label" href={`#${initialLetter}`}>
              {initialLetter}
            </a>
            <ul className="brands-container">
              {brands[initialLetter].map((brand, index) => (
                <li key={index} className="brandLink--li">
                  <Link href={`/brands/${brand}`} className="brandLink">
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <br />
        <br />
        <br />
      </div>
    </>
  );
}
