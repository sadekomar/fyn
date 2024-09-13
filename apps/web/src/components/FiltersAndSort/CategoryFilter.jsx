import React from "react";
import { Accordion } from "../Accordion/Accordion";

export function CategoryFilter({ searchParams, setSearchParams, categoriesAvailable, metadata }) {
    function setCategory(value) {
        setSearchParams((currentSearchParams) => {
            const newParams = new URLSearchParams(currentSearchParams);
            newParams.set('page', 1);
            newParams.set('category', value);
            return newParams;
        });
    }

    function setCategory(value, event) {
        console.log(value)
        if (event.target.checked) {
            setSearchParams((currentSearchParams) => {
                const newParams = new URLSearchParams(currentSearchParams);
                let existingCategories = newParams.get('category');
                let categoryArray = [];
                if (existingCategories) {
                    categoryArray = existingCategories.split(',');
                }
                if (!categoryArray.includes(value)) {
                    categoryArray.push(value);
                }
                newParams.set('category', categoryArray.join(','));
                newParams.set('page', 1);
                return newParams;
            });
        }
        else {
            setSearchParams((currentSearchParams) => {
                const newParams = new URLSearchParams(currentSearchParams);
                let existingCategories = newParams.get('category');
                let categoryArray = [];
                if (existingCategories) {
                    categoryArray = existingCategories.split(',');
                }
                if (categoryArray.includes(value)) {
                    categoryArray = categoryArray.filter(category => category !== value);
                }
                if (categoryArray.length > 0) {
                    newParams.set('category', categoryArray.join(','));
                }
                else {
                    newParams.set('category', 'all')
                }
                newParams.set('page', 1);
                return newParams;
            });

        }
    }

    function isChecked(category) {
        if (searchParams.get('category')) {
            const checkedCategories = searchParams.get('category').split(',');
            if (checkedCategories.includes(category)) {
                return true
            }
            else {
                return false
            }
        }
    }

    function resetCategories() {
        setSearchParams((currentSearchParams) => {
            const newParams = new URLSearchParams(currentSearchParams);
            newParams.set('category', 'all');
            newParams.set('page', 1);
            return newParams;
        });
    }

    return <>
        <Accordion trigger={'Categories'}>
            <button className="filters-button clear-all-button" onClick={resetCategories}>Clear All</button>
            {
                metadata['categories'].map((categoryObject, index) => (
                    <div className="filters-checkbox-wrapper">
                        <input className="filters-checkbox" checked={isChecked(categoryObject.category)} onChange={() => { setCategory(categoryObject.category, event) }} type="checkbox" name={categoryObject.category} id={categoryObject.category} />
                        <label className="filters-checkbox-label" htmlFor={categoryObject.category}>{categoryObject.category} ({categoryObject.count})</label>
                    </div>
                ))
            }
        </Accordion>
        <Accordion trigger={'Categories'}>
            {
                metadata['categories'].map((categoryObject, index) => (
                    <div>
                        <input type="checkbox" name={categoryObject.category} id="" />
                        <label htmlFor="">{categoryObject.category} ({categoryObject.count})</label>
                    </div>
                ))
            }
        </Accordion>
        {/* <div className="dropdown-and-label">
            <label htmlFor="categoryFilter">Category</label>
            <select id="categoryFilter" value={searchParams.get('category') || 'all'} onChange={(e) => { setCategory(e.target.value); }} className="dropdown">
                <option value='all'>All</option>
                {
                    metadata['categories'].map((categoryObject, index) => (
                        <option value={categoryObject.category} key={index}>{categoryObject.category} ({categoryObject.count})</option>
                    ))
                }
            </select>
        </div> */}
    </>;
}
