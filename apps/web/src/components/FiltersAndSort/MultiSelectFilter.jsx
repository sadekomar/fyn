"use client"

import React, { useEffect } from "react";
import { Accordion } from "../Accordion/Accordion";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export function MultiSelectFilter({ metadata, metadataKey, filterKey }) {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    function getUpdatedSearchParams(key, value) {
        // updates key-value and page while persisting other searchParams.
        const params = new URLSearchParams(searchParams);
        params.set(key, value)
        params.set('page', 1);
        return params.toString();
    }

    function setFilterValue(value, event) {
        const params = new URLSearchParams(searchParams);
        let checkedFiltersString = params.get(filterKey);
        let checkedFilters = checkedFiltersString ? checkedFiltersString.split(',') : [];

        if (checkedFilters.includes(value)) {
            checkedFilters = checkedFilters.filter(currentFilter => currentFilter !== value)
        } else {
            checkedFilters = checkedFilters.push(value)
        }

        if (checkedFilters.length > 0) {
            params.set(filterKey, checkedFilters.join(','));
        } else {
            params.set(filterKey, 'all');
        }
        params.set('page', 1);
        updatedParams = params.toString()

        router.push(pathname + '?' + updatedParams)
    }

    function isChecked(value) {
        const currentParam = searchParams.get(filterKey);
        if (currentParam) {
            const checkedValues = currentParam.split(',');
            if (checkedValues.includes(value)) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    function resetFilter() {
        const updatedSearchParams = getUpdatedSearchParams(filterKey, 'all')
        router.push(pathname + '?' + updatedSearchParams);
    }

    function selectAll() {
        const allFilters = metadata[metadataKey].map((filterObject, index) => (
            filterObject[filterKey]
        ));

        const updatedParams = getUpdatedSearchParams(filterKey, allFilters.join(','));
        router.push(pathname + '?' + updatedParams);
    }

    return <>
        <Accordion trigger={metadataKey}>
            <div className="filters-buttons-wrapper">
                <button className="filters-button" onClick={resetFilter}>Clear</button>
                <button className="filters-button filters-button-secondary" onClick={selectAll}>Select All</button>
            </div>
            {
                metadata[metadataKey].map((filterObject, index) => (
                    <div key={index} className="filters-checkbox-wrapper">
                        <input
                            className="filters-checkbox"
                            type="checkbox"
                            name={filterObject[filterKey]} id={filterObject[filterKey]}
                            checked={isChecked(filterObject[filterKey])}
                            onChange={() => { setFilterValue(filterObject[filterKey], event) }}
                        />

                        <label
                            className="filters-checkbox-label"
                            htmlFor={filterObject[filterKey]}
                        >
                            {filterObject[filterKey]} ({filterObject.count})
                        </label>
                    </div>
                ))
            }
        </Accordion>
    </>;
}
