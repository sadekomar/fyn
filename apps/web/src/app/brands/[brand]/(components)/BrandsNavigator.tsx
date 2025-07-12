"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ReadBrandsResponse } from "../(utils)/brand";

export function BrandsNavigator({
  params,
  brandsList,
}: {
  params: { brand: string };
  brandsList: ReadBrandsResponse | undefined;
}) {
  let currentBrand = params.brand.replaceAll("%20", " ");

  useEffect(() => {
    let activeBrand = document.querySelector(".active");
    if (activeBrand) {
      activeBrand.scrollIntoView({
        inline: "center",
        block: "center",
      });
    }
  }, [params.brand, brandsList]);

  return (
    <div className="brands-nav-wrapper">
      {brandsList?.map((brand, index) => (
        <Link className="brands-nav" href={`/brands/${brand.name}`} key={index}>
          {currentBrand === brand.name ? (
            <b style={{ fontWeight: "900" }} className="active">
              {" "}
              {brand.label ?? brand.name}{" "}
            </b>
          ) : (
            (brand.label ?? brand.name)
          )}
        </Link>
      ))}
    </div>
  );
}
