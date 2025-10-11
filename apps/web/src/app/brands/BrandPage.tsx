"use client";
import Link from "next/link";

import { LetterNavigator } from "./LetterNavigator";
import { IsometricBrands } from "@/app/(home)/(components)/IsometricBrands";
import "./AllBrands.css";
import { clientHttp } from "@/lib/queries/http.service";
import { Endpoints } from "@/api/endpoints";
import { useQuery } from "@tanstack/react-query";

export type BrandsAPI = {
  [key: string]: { id: string; name: string }[];
};

export default function BrandPage() {
  const { data: brands } = useQuery({
    queryKey: ["/brands"],
    queryFn: () => clientHttp.get<BrandsAPI>(Endpoints.BrandsAlphabetical),
  });

  return (
    <>
      <div>
        <LetterNavigator brands={brands ?? {}} />

        <div className="all-brands-title-wrapper">
          <h2 className="all-brands-title">All Brands</h2>
          <IsometricBrands />
        </div>

        {Object.keys(brands ?? {}).map((letter, index) => {
          return (
            <div key={index}>
              <a className="letter-label" href={`#${letter}`}>
                {letter}
              </a>
              <ul className="brands-container">
                {brands?.[letter]?.map(
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
