import React from "react";

export function SortingComponent({ searchParams, setSearchParams }) {
    function setSortBy(value) {
        setSearchParams((currentSearchParams) => {
            const newParams = new URLSearchParams(currentSearchParams);
            newParams.set('page', 1);
            newParams.set('sort_by', value);
            return newParams;
        });
    }

    return <>
        <div className="dropdown-and-label">
            {/* <label htmlFor="sorting">Sort By</label> */}
            <select id="sorting" className="dropdown" value={searchParams.get('sort_by') || 'date-descending'} onChange={(e) => { setSortBy(e.target.value) }}>
                <option value="date-descending">Date, new to old</option>
                <option value="date-ascending">Date, old to new</option>
                <option value="relevance">Relevance</option>
                <option value="price-ascending">Price, low to high</option>
                <option value="price-descending">Price, high to low</option>
                <option value="name-ascending">Alphabetically, A-Z</option>
                <option value="name-descending">Alphabetically, Z-A</option>
            </select>
        </div>
    </>;
}
