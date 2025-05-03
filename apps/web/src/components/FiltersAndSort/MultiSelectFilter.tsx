"use client";

import React, { useEffect } from "react";
import { Accordion } from "../Accordion/Accordion";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { MetadataI } from "@/types";

const METADATA_FILTER_TYPES = {
  categories: "categories",
  colors: "colors",
  brands: "brands",
  materials: "materials",
  genders: "genders",
} as const;

type MetadataKeys = keyof typeof METADATA_FILTER_TYPES;

export function MultiSelectFilter({
  metadata,
  filterType,
}: {
  metadata: MetadataI;
  filterType: MetadataKeys;
}) {
  const searchParams = useSearchParams();

  function getUpdatedSearchParams(key: string, value: string) {
    // updates key-value and page while persisting other searchParams.
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    params.set("page", "1");
    return params.toString();
  }

  function isChecked(value: string) {
    const currentParam = searchParams.get(filterType);
    if (currentParam) {
      const checkedValues = currentParam.split(",");
      if (checkedValues.includes(value)) {
        return true;
      } else {
        return false;
      }
    }
  }

  function setFilterValue(value: string) {
    const params = new URLSearchParams(searchParams);
    let checkedFiltersString = params.get(filterType);
    let checkedFilters = checkedFiltersString
      ? checkedFiltersString.split(",")
      : [];

    if (checkedFilters.includes(value)) {
      checkedFilters = checkedFilters.filter(
        (currentFilter) => currentFilter !== value,
      );
    } else {
      checkedFilters = checkedFilters.filter(
        (currentFilter) => currentFilter !== "all",
      );
      checkedFilters.push(value);
    }

    if (checkedFilters.length > 0) {
      params.set(filterType, checkedFilters.join(","));
    } else {
      params.set(filterType, "all");
    }
    params.set("page", "1");
    const updatedParams = params.toString();
    window.history.pushState(null, "", `?${updatedParams}`);
  }

  function selectAll() {
    const allFilters = metadata?.[filterType].map(
      (filter, index) => filter.name,
    );

    const updatedParams = getUpdatedSearchParams(
      filterType,
      allFilters.join(","),
    );
    window.history.pushState(null, "", `?${updatedParams}`);
  }

  function resetFilter() {
    const updatedParams = getUpdatedSearchParams(filterType, "all");
    window.history.pushState(null, "", `?${updatedParams}`);
  }

  return (
    <>
      <Accordion trigger={filterType}>
        <div className="filters-buttons-wrapper">
          <button className="filters-button" onClick={resetFilter}>
            Clear
          </button>
          <button
            className="filters-button filters-button-secondary"
            onClick={selectAll}
          >
            Select All
          </button>
        </div>

        {metadata?.[filterType].map((filter, index) => (
          <div key={index} className="filters-checkbox-wrapper">
            <input
              className="filters-checkbox"
              type="checkbox"
              name={filter.name}
              id={filter.name}
              checked={isChecked(filter.name)}
              onChange={() => {
                setFilterValue(filter.name);
              }}
            />

            <label className="filters-checkbox-label" htmlFor={filter.name}>
              {filter.name} ({filter.count})
            </label>
          </div>
        ))}
      </Accordion>
    </>
  );
}
