"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BrandsList } from "@/types";

export function NextPrevButtons({
  brandsList,
}: {
  brandsList: BrandsList | undefined;
}) {
  const params = useParams();
  const router = useRouter();

  function goToPrevBrand() {
    const brandParam =
      typeof params.brand === "string"
        ? params.brand.replace(/%20/g, " ")
        : Array.isArray(params.brand)
          ? params.brand[0].replace(/%20/g, " ")
          : "";

    const currentBrandIndex = brandsList?.findIndex(
      (brand) => brand.name === brandParam,
    );

    if (!currentBrandIndex) return;

    const prevBrand =
      brandsList?.[
        (currentBrandIndex - 1 + brandsList.length) % brandsList.length
      ];

    router.push("/brands/" + prevBrand?.name);
  }

  function goToNextBrand() {
    const brandParam =
      typeof params.brand === "string"
        ? params.brand.replace(/%20/g, " ")
        : Array.isArray(params.brand)
          ? params.brand[0].replace(/%20/g, " ")
          : "";

    const currentBrandIndex = brandsList?.findIndex(
      (brand) => brand.name === brandParam,
    );

    if (!currentBrandIndex) return;

    const nextBrand =
      brandsList?.[
        (currentBrandIndex + 1 + brandsList.length) % brandsList.length
      ];

    router.push("/brands/" + nextBrand?.name);
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
