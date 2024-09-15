"use client"

import React from 'react';
import { InStockFilter } from './InStockFilter';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog';


import { SortingComponent } from './SortingComponent';
import { Accordion } from '../Accordion/Accordion'

import './Filters.css';
import { MultiSelectFilter } from './MultiSelectFilter';
import { usePathname, useRouter } from 'next/navigation';

export function Filters({ metadata }) {
    const router = useRouter();
    const pathname = usePathname();

    function resetAllFilters() {
        router.push(pathname)
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
                        <InStockFilter />
                        <MultiSelectFilter metadata={metadata} metadataKey={'genders'} filterKey={'gender'} />
                        <MultiSelectFilter metadata={metadata} metadataKey={'categories'} filterKey={'category'} />
                        <MultiSelectFilter metadata={metadata} metadataKey={'colors'} filterKey={'color'} />
                        <MultiSelectFilter metadata={metadata} metadataKey={'brands'} filterKey={'brand'} />
                        <MultiSelectFilter metadata={metadata} metadataKey={'materials'} filterKey={'material'} />
                        <Dialog.Close className='filters-button'>
                            <button className="filters-button">Apply</button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Root>
            <SortingComponent />
        </div>
    </>;
}
