"use client";

import { Accordion } from "../Accordion/Accordion";
import { useSearchParams } from "next/navigation";
import { MetadataI } from "@/lib/types";
import { useEffect, useState, useCallback, useMemo } from "react";
import debounce from "lodash/debounce";

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
  metadata: MetadataI | undefined;
  filterType: MetadataKeys;
}) {
  const [checkedFilters, setCheckedFilters] = useState<{
    [key: string]: boolean;
  }>({});
  const searchParams = useSearchParams();

  useEffect(() => {
    const filters = searchParams.getAll(filterType);

    let filtersObject: { [key: string]: boolean } = {};
    metadata?.[filterType].map((filter, index) => {
      filtersObject[filter.name] = filters.includes(filter.name);
    });
    filtersObject = filters.reduce(
      (acc, filter) => {
        acc[filter] = true;
        return acc;
      },
      {} as { [key: string]: boolean },
    );

    setCheckedFilters(filtersObject);
  }, [searchParams, filterType, metadata]);

  const updateUrl = useCallback(
    (newFilters: { [key: string]: boolean }) => {
      let updatableSearchParams = new URLSearchParams(searchParams);
      updatableSearchParams.delete(filterType);
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) {
          updatableSearchParams.append(filterType, key);
        }
      });
      updatableSearchParams.set("page", "1");
      window.history.pushState(
        null,
        "",
        `?${updatableSearchParams.toString()}`,
      );
    },
    [searchParams, filterType],
  );

  const debouncedUpdateUrl = useMemo(
    () => debounce(updateUrl, 600),
    [updateUrl],
  );

  function setFilterValue(value: string) {
    setCheckedFilters((prev) => {
      const newState = {
        ...prev,
        [value]: !prev[value],
      };
      debouncedUpdateUrl(newState);
      return newState;
    });
  }

  function selectAll() {
    const allFilters = metadata?.[filterType].reduce(
      (acc, filter) => ({
        ...acc,
        [filter.name]: true,
      }),
      {} as { [key: string]: boolean },
    );
    if (allFilters) {
      setCheckedFilters(allFilters);
      debouncedUpdateUrl(allFilters);
    }
  }

  function resetFilter() {
    const emptyFilters = metadata?.[filterType].reduce(
      (acc, filter) => ({
        ...acc,
        [filter.name]: false,
      }),
      {} as { [key: string]: boolean },
    );
    if (emptyFilters) {
      setCheckedFilters(emptyFilters);
      debouncedUpdateUrl(emptyFilters);
    }
  }

  return (
    <>
      <Accordion trigger={filterType}>
        <>
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

          {metadata?.[filterType]?.map((filter, index) => (
            <div
              key={index}
              className="filters-checkbox-wrapper transition-transform duration-100 active:scale-98"
            >
              <input
                className="filters-checkbox"
                type="checkbox"
                name={filter.name}
                id={filter.name}
                checked={checkedFilters[filter.name] || false}
                onChange={() => {
                  setFilterValue(filter.name);
                }}
              />

              <label
                className="filters-checkbox-label select-none"
                htmlFor={filter.name}
              >
                {filter.name} ({filter.count})
              </label>
            </div>
          ))}
        </>
      </Accordion>
    </>
  );
}
