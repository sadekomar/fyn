"use client";

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { MetadataI } from "@/lib/types";

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

      <style jsx>{`
        .color-pills-wrapper {
          display: flex;
          overflow: auto;
          scrollbar-width: none;
          gap: 0.5rem;
          margin-block: 1rem;
          padding-inline: max(
            calc((100% - var(--grid-max-width)) / 2),
            var(--margin-inline)
          );
        }

        .color-pill {
          height: 40px;
          padding-inline: 1rem;
          padding-block: 0.5rem;
          flex-shrink: 0;
          text-transform: capitalize;
          background-color: var(--clr-gray-background);
          color: var(--clr-neutral-900);
          font-weight: var(--fw-regular);
          border-radius: 10px;
          cursor: pointer;
          user-select: none;
        }

        .color-pill-selected {
          background-color: var(--clr-loom-lilac);
          color: var(--clr-neutral-100);
        }
      `}</style>
    </div>
  );
}
