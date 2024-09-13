import React from "react";
import { Accordion } from "../Accordion/Accordion";

export function GenderFilter({ searchParams, setSearchParams, gendersAvailable, metadata }) {
    function setGender(value) {
        setSearchParams((currentSearchParams) => {
            const newParams = new URLSearchParams(currentSearchParams);
            newParams.set('page', 1);
            newParams.set('gender', value);
            return newParams;
        });
    }

    return <>

        <Accordion trigger={'Gender'}>
            {
                metadata['genders'].map((genderObject, index) => (
                    <div key={index}>
                        <input type="checkbox" name={genderObject.gender} id="" />
                        <label htmlFor="">{genderObject.gender} ({genderObject.count})</label>
                    </div>
                ))
            }
        </Accordion>
        {/* <div className="dropdown-and-label">
            <label htmlFor="genderFilter">Gender</label>
            <select id="genderFilter" value={searchParams.get('gender') || 'all'} onChange={(e) => { setGender(e.target.value); }} className="dropdown">
                <option value='all'>All</option>
                {
                    metadata['genders'].map((genderObject, index) => (
                        <option value={genderObject.gender} key={index}>{genderObject.gender} ({genderObject.count})</option>
                    ))
                }
            </select>
        </div> */}

    </>;
}
