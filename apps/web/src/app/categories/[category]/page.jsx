import './CategoryPage.css'

import { GridLayout } from '@/layouts/GridLayout/GridLayout';
import { ColorPills } from '@/app/(home)/(ColorPills)/ColorPills';
import { Suspense } from 'react';

import { categories, newCategories } from '@/data/categories';
import { FiltersAndCount } from '@/components/FiltersAndCount/FiltersAndCount';
import { Pagination } from '@/components/Pagination/Pagination';
import { IPAddress } from '@/data/IPAddress';
import { PaginationControl } from '@/components/Pagination/PaginationControl';

export default async function CategoryPage({ params, searchParams }) {
    const fetchData = async (category, searchParams) => {
        const searchParamsObject = new URLSearchParams(searchParams);
        const response = await fetch(`${IPAddress}/search?category=${category}&${searchParamsObject.toString()}`);
        return response.json();
    };

    const fetchMetadata = async (category, searchParams) => {
        const searchParamsObject = new URLSearchParams(searchParams);
        const metadataResponse = await fetch(`${IPAddress}/metadata?category=${category}&${searchParamsObject.toString()}`);
        return metadataResponse.json();
    };

    const [data, metadata] = await Promise.all([
        fetchData(params['category'], searchParams),
        fetchMetadata(params['category'], searchParams)
    ]);

    const ITEMS_PER_PAGE = 100;
    const numberOfItems = metadata['item_count'] || 0;
    const numberOfPages = Math.ceil(numberOfItems / ITEMS_PER_PAGE);
    const pageNumbers = Array.from({ length: numberOfPages }, (_, index) => index + 1);

    return <>
        <div className="category-page-header">
            <img src={newCategories[params['category']]?.['image'] || ''} alt="" />
            <div className='category-page-title-wrapper'>
                <h2 className="category-page-title">{params['category']}</h2>
            </div>
        </div>

        <ColorPills metadata={metadata} />

        <FiltersAndCount numberOfItems={numberOfItems} metadata={metadata} />
        
        <GridLayout products={data} />

        <PaginationControl numberOfPages={numberOfPages} pageNumbers={pageNumbers} />
    </>;
}
