"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import "./ColorPills.css";
import { MetadataI } from "@/types";

export function ColorPills({ metadata }: { metadata: MetadataI }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentColor = searchParams.get("color");

  const toggleColor = useCallback(
    (color: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");

      if (currentColor == color) {
        params.set("color", "all");
        window.history.pushState(null, "", `?${params.toString()}`);
      } else {
        params.set("color", color);
        window.history.pushState(null, "", `?${params.toString()}`);
      }
    },
    [searchParams, currentColor, router, pathname],
  );

  return (
    <div className="color-pills-wrapper">
      <div
        className={`color-pill ${searchParams.get("color") === "all" ? "color-pill-selected" : ""}`}
        onClick={() => {
          toggleColor("all");
        }}
      >
        All
      </div>

      {metadata?.colors.map((color, index) => (
        <div
          key={index}
          className={`color-pill ${color.name === searchParams.get("color") ? "color-pill-selected" : ""}`}
          onClick={() => toggleColor(color.name)}
        >
          {color.name} ({color.count})
        </div>
      ))}
    </div>
  );
}
