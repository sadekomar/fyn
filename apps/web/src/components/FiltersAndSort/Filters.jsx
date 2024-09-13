import React from 'react';
import { InStockFilter } from './InStockFilter';
import { GenderFilter } from './GenderFilter';
import { CategoryFilter } from './CategoryFilter';
import { ColorFilter } from './ColorFilter';
import { MaterialFilter } from './MaterialFilter';
import { BrandFilter } from './BrandFilter';
import { MixerHorizontalIcon, Cross1Icon } from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog';


import { SortingComponent } from './SortingComponent';
import { Accordion } from '../Accordion/Accordion'

import './Filters.css';
import { MultiSelectFilter } from './MultiSelectFilter';

export function Filters({ searchParams, setSearchParams, metadata }) {
    function resetAllFilters() {
        setSearchParams((currentSearchParams) => {
            const newParams = new URLSearchParams(currentSearchParams);
            newParams.set('page', 1);
            newParams.set('gender', 'all');
            newParams.set('category', 'all');
            newParams.set('color', 'all');
            newParams.set('brand', 'all');
            newParams.set('material', 'all');

            return newParams;
        });
    }

    return <>
        <div className='filters-and-sort'>
            <Dialog.Root className='filters-root'>
                <Dialog.Trigger className='filters-trigger'>
                    <MixerHorizontalIcon />Filters
                </Dialog.Trigger>
                <Dialog.Content className='dialog-content'>
                    <div className="filters-wrapper">

                        <button className='filters-button' onClick={resetAllFilters}>Clear All</button>
                        <InStockFilter searchParams={searchParams} setSearchParams={setSearchParams} />
                        <MultiSelectFilter searchParams={searchParams} setSearchParams={setSearchParams} metadata={metadata} metadataKey={'genders'} filterKey={'gender'} />
                        <MultiSelectFilter searchParams={searchParams} setSearchParams={setSearchParams} metadata={metadata} metadataKey={'categories'} filterKey={'category'} />
                        <MultiSelectFilter searchParams={searchParams} setSearchParams={setSearchParams} metadata={metadata} metadataKey={'colors'} filterKey={'color'} />
                        <MultiSelectFilter searchParams={searchParams} setSearchParams={setSearchParams} metadata={metadata} metadataKey={'brands'} filterKey={'brand'} />
                        <MultiSelectFilter searchParams={searchParams} setSearchParams={setSearchParams} metadata={metadata} metadataKey={'materials'} filterKey={'material'} />
                        <Dialog.Close className='filters-button'>
                            <button className="filters-button">Apply</button>
                        </Dialog.Close>
                    </div>


                </Dialog.Content>
            </Dialog.Root>
            <SortingComponent searchParams={searchParams} setSearchParams={setSearchParams} />
        </div>
    </>;
}
