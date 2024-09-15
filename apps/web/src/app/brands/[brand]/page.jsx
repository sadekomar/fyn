import { CaretLeftIcon, CaretRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Suspense } from 'react';

import { heroImages } from "@/data/heroImages";
import { IPAddress } from '@/data/IPAddress';

import { CategorySelectorFetch } from './CategorySelectorFetch';
import { FiltersAndCountFetch } from './FiltersAndContFetch';
import { CategorySelector } from '@/components/CategorySelector/CategorySelector';


import './BrandPage.css'
// import '../SearchPage/SearchPage.css'

import { BrandsNavigator } from './BrandsNavigator';
import { LoomImage } from "./LoomImage";
import { BrandDescription } from './BrandDescription';
import { BrandProducts } from './BrandProducts';
import { NextPrevButtons } from './NextPrevButtons';

import { GridPlaceholder } from '@/layouts/GridLayout/GridPlaceholder';

import { FollowButton } from "@/components/FollowButton/FollowButton";
import { BrandMetadata } from './CategorySelectorFetch';
import { Pagination } from '@/components/Pagination/Pagination';
import { CategorySelectorPlaceholder } from './CategorySelectorPlaceholder';
import { metadata } from '../page';

export async function generateMetadata({ params, searchParams }) {
    const brand = params.brand.replaceAll('%20', ' ')
    console.log(brand)

    return {
        title: brand,
        openGraph: {
            title: brand,
            description: 'Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.',
            type: 'website',
        },
    }
}

export default async function BrandPage({ params, searchParams }) {
    const brand = params.brand
    const coverImage = '';

    const response = await fetch(`${IPAddress}/brands-list`);
    const brandsList = await response.json();

    function getHeroImage() {
        if (heroImages[params.brand]) {
            let displayImage = heroImages[params.brand];
            displayImage.replace('loom-image-dimensions', '300')
            return displayImage;
        } else {
            if (coverImage) {
                return coverImage['src'];
            }
        }
    }

    return <>
        <div className="brand-page-wrapper">
            <BrandsNavigator params={params} brandsList={brandsList} />

            <div className="BrandImageContainer">
                <LoomImage src={getHeroImage()} />
                <div className="BrandContainer">
                    <div className="brand-info-wrapper">
                        <h2 className="brand-name">{params.brand.replaceAll('%20', ' ')}</h2>
                        <FollowButton className={'follow-button-white'} brand={params.brand} />
                    </div>
                    <BrandDescription brand={brand} />
                    <NextPrevButtons brandsList={brandsList} params={params} searchParams={searchParams} />
                </div>
            </div >

            <Suspense fallback={<CategorySelectorPlaceholder />}>
                <CategorySelectorFetch params={params} searchParams={searchParams} />
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
                <FiltersAndCountFetch params={params} searchParams={searchParams} />
            </Suspense>

            <Suspense fallback={<GridPlaceholder />}>
                <BrandProducts params={params} searchParams={searchParams} />
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
                <Pagination params={params} searchParams={searchParams} />
            </Suspense>
        </div>
    </>;
}


