import './CategoryPage.css'

import { GridLayout } from '@/layouts/GridLayout/GridLayout';
import { ColorPills } from '@/app/(home)/(ColorPills)/ColorPills';
import { GridFetcher } from './GridFetcher';
import { Suspense } from 'react';

import { categories, newCategories } from '@/data/categories';
import { FiltersAndCount } from '@/components/FiltersAndCount/FiltersAndCount';
import { Pagination } from '@/components/Pagination/Pagination';
import { IPAddress } from '@/data/IPAddress';
import { PaginationControl } from '@/components/Pagination/PaginationControl';

export default async function CategoryPage({ params, searchParams }) {
    const fetchData = async (category) => {
        const searchParamsObject = new URLSearchParams(searchParams);
        console.log(`server side fetching ${searchParamsObject.toString()}`)
        const response = await fetch(`${IPAddress}/search?category=${category}&${searchParamsObject.toString()}`);
        return response.json();
    };

    const fetchMetadata = async (category) => {
        const searchParamsObject = new URLSearchParams(searchParams);
        const metadataResponse = await fetch(`${IPAddress}/metadata?category=${category}&${searchParamsObject.toString()}`);
        return metadataResponse.json();
    };

    let data, metadata, numberOfItems, numberOfPages, pageNumbers;

    [data, metadata] = await Promise.all([
        fetchData(params['category']),
        fetchMetadata(params['category'])
    ]);

    const ITEMS_PER_PAGE = 100;
    numberOfItems = metadata['item_count'] || 0;
    numberOfPages = Math.ceil(numberOfItems / ITEMS_PER_PAGE);
    pageNumbers = Array.from({ length: numberOfPages }, (_, index) => index + 1);

    return <>
        <div className="category-page-header">
            <img src={newCategories[params['category']]?.['image'] || ''} alt="" />
            <div className='category-page-title-wrapper'>
                <h2 className="category-page-title">{params['category']}</h2>
            </div>
        </div>

        <ColorPills metadata={metadata} />

        <FiltersAndCount numberOfItems={numberOfItems} metadata={metadata} />

        {/* <GridLayout products={data} /> */}
        <GridFetcher serverData={data} />

        {/* <PaginationControl numberOfPages={numberOfPages} pageNumbers={pageNumbers} /> */}
    </>;

}