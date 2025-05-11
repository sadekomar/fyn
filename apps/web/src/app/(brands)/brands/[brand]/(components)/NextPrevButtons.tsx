"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export function NextPrevButtons({ brandsList }: { brandsList: string[] }) {
  const params = useParams();
  const router = useRouter();

  function goToPrevBrand() {
    const brandParam =
      typeof params.brand === "string"
        ? params.brand.replace(/%20/g, " ")
        : Array.isArray(params.brand)
          ? params.brand[0].replace(/%20/g, " ")
          : "";

    const currentBrandIndex = brandsList.indexOf(brandParam);
    const prevBrand =
      brandsList[
        (currentBrandIndex - 1 + brandsList.length) % brandsList.length
      ];

    router.push("/brands/" + prevBrand);
  }

  function goToNextBrand() {
    const brandParam =
      typeof params.brand === "string"
        ? params.brand.replace(/%20/g, " ")
        : Array.isArray(params.brand)
          ? params.brand[0].replace(/%20/g, " ")
          : "";

    const currentBrandIndex = brandsList.indexOf(brandParam);
    const nextBrand =
      brandsList[
        (currentBrandIndex + 1 + brandsList.length) % brandsList.length
      ];

    router.push("/brands/" + nextBrand);
  }

  return (
    <div className="brand-nav-buttons-wrapper">
      <button className="brand-nav-button" onClick={goToPrevBrand}>
        <ChevronLeft width="25px" height="25px" /> Previous Brand
      </button>
      <button className="brand-nav-button" onClick={goToNextBrand}>
        Next Brand <ChevronRight width="25px" height="25px" />
      </button>
    </div>
  );
}
