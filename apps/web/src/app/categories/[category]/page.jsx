import './CategoryPage.css'

import { GridLayout } from '@/layouts/GridLayout/GridLayout';
import { ColorPills } from '@/app/(home)/(ColorPills)/ColorPills';
import { GridFetcher } from './GridFetcher';
import { Suspense } from 'react';

import { categories, newCategories } from '@/data/categories';
import { FiltersAndCount } from '@/components/FiltersAndCount/FiltersAndCount';
import { IPAddress } from '@/data/IPAddress';
import { PaginationControl } from '@/components/Pagination/PaginationControl';
import { revalidatePath } from 'next/cache';


export default async function CategoryPage({ params, searchParams }) {
    async function revalidateServerData() {
        'use server';
        revalidatePath(`/categories/${params.category}`);
    }

    const fetchData = async (category) => {
        const searchParamsObject = new URLSearchParams(searchParams);
        const response = await fetch(`${IPAddress}/search?category=${category}&${searchParamsObject.toString()}`);
        return response.json();
    };

    const fetchMetadata = async (category) => {
        const searchParamsObject = new URLSearchParams(searchParams);
        const metadataResponse = await fetch(`${IPAddress}/metadata?category=${category}&${searchParamsObject.toString()}`);
        return metadataResponse.json();
    };

    let data, metadata;

    [data, metadata] = await Promise.all([
        fetchData(params['category']),
        fetchMetadata(params['category'])
    ]);

    return <>
        <div className="category-page-header">
            <img src={newCategories[params['category']]?.['image'] || ''} alt="" />
            <div className='category-page-title-wrapper'>
                <h2 className="category-page-title">{params['category']}</h2>
            </div>
        </div>

        <ColorPills metadata={metadata} />
        <FiltersAndCount metadata={metadata} />
        <GridFetcher serverData={data} revalidateServerData={revalidateServerData} page={'category'} />
        <PaginationControl metadata={metadata} />
    </>;

}