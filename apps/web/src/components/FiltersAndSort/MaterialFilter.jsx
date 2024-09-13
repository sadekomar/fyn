import React from "react";
import { Accordion } from "../Accordion/Accordion";

export function MaterialFilter({ searchParams, setSearchParams, metadata }) {
    let MaterialsAvailable = ['linen', 'cotton', 'denim'];
    function setMaterial(value) {
        setSearchParams((currentSearchParams) => {
            const newParams = new URLSearchParams(currentSearchParams);
            newParams.set('page', 1);
            newParams.set('material', value);
            return newParams;
        });
    }

    return <>
        <Accordion trigger={'Materials'}>
            {
                metadata['materials'].map((materialObject, index) => (
                    <div key={index}>
                        <input type="checkbox" name={materialObject.material} id="" />
                        <label htmlFor="">{materialObject.material} ({materialObject.count})</label>
                    </div>
                ))
            }
        </Accordion>
        {/* <div className="dropdown-and-label">
            <label htmlFor="materialFilter">Material</label>
            <select id="materialFilter" value={searchParams.get('material') || 'all'} onChange={(e) => { setMaterial(e.target.value); }} className="dropdown">
                <option value='all'>All</option>
                {
                    metadata['materials'].map((materialObject, index) => (
                        <option value={materialObject.material} key={index}>{materialObject.material} ({materialObject.count})</option>
                    ))
                }
            </select>
        </div> */}
    </>;
}
