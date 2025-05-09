"use client";

import React from "react";
import { InStockFilter } from "./InStockFilter";
import * as Dialog from "@radix-ui/react-dialog";

import { SortingComponent } from "./SortingComponent";

import "./Filters.css";
import { MultiSelectFilter } from "./MultiSelectFilter";
import { usePathname, useSearchParams } from "next/navigation";
import { MetadataI } from "@/types";

export function Filters({ metadata }: { metadata: MetadataI | undefined }) {
  const searchParams = useSearchParams();

  const pathname = usePathname();

  function resetAllFilters() {
    window.history.pushState(null, "", pathname);
  }

  return (
    <>
      <div className="filters-and-sort">
        <Dialog.Root>
          <Dialog.Trigger className="filters-trigger">Filters</Dialog.Trigger>
          <Dialog.Content className="dialog-content">
            <Dialog.Title>Filters</Dialog.Title>
            <Dialog.Description className="sr-only">
              Multiselect filters for gender, category, color, brand, and
              material
            </Dialog.Description>
            <div className="filters-wrapper">
              <button className="filters-button" onClick={resetAllFilters}>
                Clear All
              </button>
              <InStockFilter />
              <MultiSelectFilter metadata={metadata} filterType={"genders"} />
              <MultiSelectFilter
                metadata={metadata}
                filterType={"categories"}
              />
              <MultiSelectFilter metadata={metadata} filterType={"colors"} />
              <MultiSelectFilter metadata={metadata} filterType={"brands"} />
              <MultiSelectFilter metadata={metadata} filterType={"materials"} />
              <Dialog.Close asChild>
                <button className="filters-button">Apply</button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Root>
        <SortingComponent />
      </div>
    </>
  );
}
