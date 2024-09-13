import React, { useEffect } from "react";
import { Accordion } from "../Accordion/Accordion";

export function MultiSelectFilter({ searchParams, setSearchParams, metadata, metadataKey, filterKey }) {

    function setFilterValue(value, event) {
        console.log(value)
        if (event.target.checked) {
            setSearchParams((currentSearchParams) => {
                const newParams = new URLSearchParams(currentSearchParams);
                let existingValues = newParams.get(filterKey);
                let valuesArray = [];
                if (existingValues) {
                    valuesArray = existingValues.split(',');
                }
                if (!valuesArray.includes(value)) {
                    valuesArray.push(value);
                }
                newParams.set(filterKey, valuesArray.join(','));
                newParams.set('page', 1);
                return newParams;
            });
        }
        else {
            setSearchParams((currentSearchParams) => {
                const newParams = new URLSearchParams(currentSearchParams);
                let existingValues = newParams.get(filterKey);
                let valuesArray = [];
                if (existingValues) {
                    valuesArray = existingValues.split(',');
                }
                if (valuesArray.includes(value)) {
                    valuesArray = valuesArray.filter(currentValue => currentValue !== value);
                }
                if (valuesArray.length > 0) {
                    newParams.set(filterKey, valuesArray.join(','));
                }
                else {
                    newParams.set(filterKey, 'all')
                }
                newParams.set('page', 1);
                return newParams;
            });

        }
    }

    function isChecked(value) {
        if (searchParams.get(filterKey)) {
            const checkedValues = searchParams.get(filterKey).split(',');
            if (checkedValues.includes(value)) {
                return true
            }
            else {
                return false
            }
        }
    }

    function resetFilters() {
        setSearchParams((currentSearchParams) => {
            const newParams = new URLSearchParams(currentSearchParams);
            newParams.set(filterKey, 'all');
            newParams.set('page', 1);
            return newParams;
        });
    }
    function selectAll() {
        setSearchParams((currentSearchParams) => {
            const newParams = new URLSearchParams(currentSearchParams);
            const allFilters = metadata[metadataKey].map((filterObject, index) => (
                filterObject[filterKey]
             ));
             console.log(allFilters.join(','));
             const allFiltersString = allFilters.join(',');


            newParams.set(filterKey, allFiltersString);
            newParams.set('page', 1);
            return newParams;
        });
    }

    return <>
        <Accordion trigger={metadataKey}>
            <div className="filters-buttons-wrapper">
                <button className="filters-button" onClick={resetFilters}>Clear</button>
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
