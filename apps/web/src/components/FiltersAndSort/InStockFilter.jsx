import React from "react";

export function InStockFilter({ searchParams, setSearchParams }) {
    function setAvailability(e) {
        let availabilityValue = e.target.checked ? 'in-stock' : 'all';
        setSearchParams((currentSearchParams) => {
            const newParams = new URLSearchParams(currentSearchParams);
            newParams.set('page', 1);
            newParams.set('availability', availabilityValue);
            return newParams;
        });
    }

    return <>
        <div className="in-stock-wrapper">
            <input className="filters-checkbox" type="checkbox" id="inStockCheckbox" checked={searchParams.get('availability') === 'in-stock'} onChange={(e) => { setAvailability(e); }} />
            <label className="filters-checkbox-label" htmlFor="inStockCheckbox">In Stock Only</label>
        </div>
    </>;
}
