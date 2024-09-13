import Link from 'next/link';

import './home.css'

import { Hero } from './(Hero)/Hero';
import { BrandScroller } from '@/components/BrandScroller';
import { ShopByCategory } from './(Categories)/ShopByCategory';
import { Brands } from './(Brands)/Brands';
import { RecentlyViewed } from '../item/[id]/RecentlyViewed';
import { FollowedBrands } from './FollowedBrands';
import { BrandOfTheDay } from './BrandOfTheDay';
import { Suspense } from 'react';

export const metadata = {
    title: 'Loom Cairo: Shop 300 Local Fashion Brands in One Place',
    description: 'Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.',
    robots: 'index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large',
    keywords: 'Loom Cairo, Local Brands, Fashion Brands, Egyptian Local Brands',
    openGraph: {
        title: 'Loom Cairo: Shop 300 Local Fashion Brands in One Place',
        description: 'Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Loom Cairo: Shop 300 Local Fashion Brands in One Place',
        description: 'Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.',
    },
    alternates: {
        canonical: 'https://loomcairo.com/',
    },
}

export default function Home() {
    return <>
        <Hero />
        {/* <Brands /> */}

        <Suspense fallback={<div>Loading</div>}>
            <BrandScroller title={'Latest from '} brand={'brown toast'} />
        </Suspense>
        <Suspense fallback={<div>Loading</div>}>
            <BrandOfTheDay brand={'juvenile'} />
        </Suspense>
        
        <ShopByGender />
        <ShopByCategory />
        <FollowedBrands />
        <RecentlyViewed />
    </>;
}

function ShopByGender() {
    return <div className='gender-wrapper'>
        <h3 className='genders-title'>Shop by Gender</h3>
        <div className='genders'>
            <Link href='/all-categories?gender=women,unisex' className='gender'>
                <img src="https://res.cloudinary.com/dffgye7z3/image/upload/v1725840213/women_lpshuo.webp" alt="Men categories" />

                <div className='button-container'><button className='gender-button'>Women</button></div>
            </Link>
            <Link href='/all-categories?gender=men,unisex' className='gender'>
                <img src="https://res.cloudinary.com/dffgye7z3/image/upload/v1725840214/men_ysf6jd.webp" alt="Men categories" />
                <div className='button-container'><button className='gender-button'>Men</button></div>
            </Link>
        </div>
    </div>;
}