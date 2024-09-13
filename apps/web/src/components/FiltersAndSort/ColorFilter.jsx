import React, { useEffect } from "react";
import { Accordion } from "../Accordion/Accordion";

export function ColorFilter({ searchParams, setSearchParams, metadata }) {
    
    function setColor(value, event) {
        console.log(value)
        if (event.target.checked) {
            setSearchParams((currentSearchParams) => {
                const newParams = new URLSearchParams(currentSearchParams);
                let existingColors = newParams.get('color');
                let colorArray = [];
                if (existingColors) {
                    colorArray = existingColors.split(',');
                }
                if (!colorArray.includes(value)) {
                    colorArray.push(value);
                }
                newParams.set('color', colorArray.join(','));
                newParams.set('page', 1);
                return newParams;
            });
        }
        else {
            setSearchParams((currentSearchParams) => {
                const newParams = new URLSearchParams(currentSearchParams);
                let existingColors = newParams.get('color');
                let colorArray = [];
                if (existingColors) {
                    colorArray = existingColors.split(',');
                }
                if (colorArray.includes(value)) {
                    colorArray = colorArray.filter(color => color !== value);
                }
                if (colorArray.length > 0) {
                    newParams.set('color', colorArray.join(','));
                }
                else {
                    newParams.set('color', 'all')
                }
                newParams.set('page', 1);
                return newParams;
            });

        }
    }

    function isChecked(color) {
        if (searchParams.get('color')) {
            const checkedColors = searchParams.get('color').split(',');
            if (checkedColors.includes(color)) {
                return true
            }
            else {
                return false
            }
        }
    }

    function resetColors() {
        setSearchParams((currentSearchParams) => {
            const newParams = new URLSearchParams(currentSearchParams);
            newParams.set('color', 'all');
            newParams.set('page', 1);
            return newParams;
        });
    }

    return <>
        <Accordion trigger={'Colors'}>
            <button className="filters-button clear-all-button" onClick={resetColors}>Clear All</button>
            {
                metadata['colors'].map((colorObject, index) => (
                    <div className="filters-checkbox-wrapper">
                        <input className="filters-checkbox" checked={isChecked(colorObject.color)} onChange={()=>{setColor(colorObject.color, event)}} type="checkbox" name={colorObject.color} id={colorObject.color} />
                        <label className="filters-checkbox-label" htmlFor={colorObject.color}>{colorObject.color} ({colorObject.count})</label>
                    </div>
                ))
            }
        </Accordion>
    </>;
}
