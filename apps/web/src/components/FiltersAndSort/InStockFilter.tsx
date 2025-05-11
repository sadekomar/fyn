"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function InStockFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function toggleInStock() {
    const currentAvailability = searchParams.get("availability");
    const params = new URLSearchParams(searchParams);
    params.set(
      "availability",
      currentAvailability === "in-stock" ? "all" : "in-stock",
    );
    params.set("page", "1");
    router.push(pathname + "?" + params.toString(), { scroll: false });
  }

  function isChecked() {
    return searchParams.get("availability") === "in-stock";
  }

  return (
    <>
      <div className="in-stock-wrapper">
        <input
          className="filters-checkbox"
          type="checkbox"
          id="inStockCheckbox"
          checked={isChecked()}
          onChange={toggleInStock}
        />
        <label className="filters-checkbox-label" htmlFor="inStockCheckbox">
          In Stock Only
        </label>
      </div>
    </>
  );
}
