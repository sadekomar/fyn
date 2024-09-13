import React from "react";
import { Accordion } from "../Accordion/Accordion";

export function BrandFilter({ searchParams, setSearchParams, brandsAvailable, metadata }) {
    function setBrand(value) {
        setSearchParams((currentSearchParams) => {
            const newParams = new URLSearchParams(currentSearchParams);
            newParams.set('page', 1);
            newParams.set('brand', value);
            return newParams;
        });
    }

    return <>
        <Accordion trigger={'Brands'}>
            {
                metadata['brands'].map((brandObject, index) => (
                    <div key={index}>
                        <input type="checkbox" name={brandObject.brand} id="" />
                        <label htmlFor="">{brandObject.brand} ({brandObject.count})</label>
                    </div>
                ))
            }
        </Accordion>
        {/* <div className="dropdown-and-label">
            <label htmlFor="brandFilter">Brand</label>
            <select id="brandFilter" value={searchParams.get('brand') || 'all'} onChange={(e) => { setBrand(e.target.value); }} className="dropdown">
                <option value='all'>All</option>
                {
                    metadata['brands'].map((brandObject, index) => (
                        <option value={brandObject.brand} key={index}>{brandObject.brand} ({brandObject.count})</option>
                    ))
                }
            </select>
        </div> */}

    </>;
}
