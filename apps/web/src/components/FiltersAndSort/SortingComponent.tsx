"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SortingComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setSortBy(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("sort_by", value);
    params.set("page", "1");

    router.push(pathname + "?" + params.toString(), { scroll: false });
  }

  return (
    <>
      <div className="dropdown-and-label">
        {/* <label htmlFor="sorting">Sort By</label> */}
        <select
          id="sorting"
          className="dropdown"
          value={searchParams.get("sort_by") || "date-descending"}
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option value="date-descending">Date, new to old</option>
          <option value="date-ascending">Date, old to new</option>
          <option value="relevance">Relevance</option>
          <option value="price-ascending">Price, low to high</option>
          <option value="price-descending">Price, high to low</option>
          <option value="name-ascending">Alphabetically, A-Z</option>
          <option value="name-descending">Alphabetically, Z-A</option>
        </select>
      </div>
    </>
  );
}
