"use client";

import { usePathname, useSearchParams } from "next/navigation";

export function InStockFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function toggleInStock() {
    const params = new URLSearchParams(searchParams);
    const isInStock = params.get("in_stock") === "true";

    if (isInStock) {
      params.delete("in_stock");
    } else {
      params.set("in_stock", "true");
    }

    params.set("page", "1");
    window.history.pushState(null, "", pathname + "?" + params.toString());
  }

  function isChecked() {
    return searchParams.get("in_stock") === "true";
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
