"use client";

import React from "react";

import "./FollowButton.css";
import { BrandData } from "@/api/types/brand-types";
import {
  useAddFollowedBrand,
  useGetFollowedBrands,
} from "./(utils)/use-follow";

export function FollowButton({
  brandData,
  className = "",
}: {
  brandData: BrandData | undefined;
  className?: string;
}) {
  const { mutate: addFollowedBrand } = useAddFollowedBrand();
  const { data: following } = useGetFollowedBrands();

  if (!brandData) return null;

  return (
    <>
      <button
        onClick={() => {
          addFollowedBrand(brandData.id);
        }}
        className={`follow-button ${className} ${
          following?.some((brand) => brand.brandId === brandData.id)
            ? "followed"
            : ""
        }`}
      >
        {following?.some((brand) => brand.brandId === brandData.id)
          ? "Following"
          : "Follow"}
      </button>
    </>
  );
}
