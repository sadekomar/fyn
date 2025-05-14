"use client";

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import "./ColorPills.css";
import { MetadataI } from "@/types";

export function ColorPills({ metadata }: { metadata: MetadataI | undefined }) {
  const searchParams = useSearchParams();

  const toggleColor = useCallback(
    (color: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");

      if (params.get("colors") == color) {
        params.delete("colors");
        window.history.pushState(null, "", `?${params.toString()}`);
      } else {
        params.set("colors", color);
        window.history.pushState(null, "", `?${params.toString()}`);
      }
    },
    [searchParams],
  );

  const selectAllColors = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.delete("colors");
    window.history.pushState(null, "", `?${params.toString()}`);
  }, [searchParams]);

  return (
    <div className="color-pills-wrapper">
      <div
        className={`color-pill ${searchParams.get("colors") ? "" : "color-pill-selected"}`}
        onClick={selectAllColors}
      >
        All
      </div>

      {metadata?.colors.map((color, index) => (
        <div
          key={index}
          className={`color-pill ${color.name === searchParams.get("colors") ? "color-pill-selected" : ""}`}
          onClick={() => toggleColor(color.name)}
        >
          {color.name} ({color.count})
        </div>
      ))}
    </div>
  );
}
