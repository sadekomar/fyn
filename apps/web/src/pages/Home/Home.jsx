import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Link from 'next/link';

// shared components
import { BrandInfo } from '../../components/BrandInfo';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { EmptyState } from '../../components/EmptyState/EmptyState';

// layouts
import { BrandScroller } from '../../components/BrandScroller';

// page components
import { Hero } from './components/Hero/Hero';
import { ShopByCategory } from './components/Categories/ShopByCategory';
import { RecentlyViewed } from '../ItemPage/RecentlyViewed';
import { Brands } from './components/Brands/Brands';

import './home.css'

export function Home() {
    return (<>
        <Helmet>
            <title>Loom Cairo: Shop 300 Local Fashion Brands in One Place</title>
            <meta name="description" content="Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands." />

            <meta name="robots" content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />                        
            <meta name="keywords" content="Loom Cairo, Local Brands, Fashion Brands, Egyptian Local Brands" />

            <meta property="og:title" content="Loom Cairo: Shop 300 Local Fashion Brands in One Place" />
            <meta property="og:description" content="Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands." />
            <meta property="og:type" content="website" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content="Loom Cairo: Shop 300 Local Fashion Brands in One Place" />
            <meta name="twitter:description" content="Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands." />

            <link rel="canonical" href="https://loomcairo.com/" />
        </Helmet>
        <Hero />

        <Brands />

        <BrandScroller title={'Latest from '} BrandInfo={<BrandInfo brand={'aesthete'} />} brand={'aesthete'} />

        <BrandOfTheDay />

        {/* <BrandScroller title={'New on Loom: '} BrandInfo={<BrandInfo brand={'vee'} />} brand={'vee'} /> */}

        <div className='gender-wrapper'>
            <h3 className='genders-title'>Shop by Gender</h3>
            <div className='genders'>
                <Link href='/all-categories?gender=women,unisex' className='gender'>
                    <img src="/home/women.webp" alt="Women categories" />
                    <div className='button-container'><button className='gender-button'>Women</button></div>
                </Link>
                <Link href='/all-categories?gender=men,unisex' className='gender'>
                    <img src="/home/men.webp" alt="Men categories" />
                    <div className='button-container'><button className='gender-button'>Men</button></div>
                </Link>
            </div>
        </div>


        <ShopByCategory />
        <FollowedBrands />
        <RecentlyViewed />


    </>);
}

function FollowedBrands() {
    const localFollowing = JSON.parse(localStorage.getItem('following') || '[]')
    localFollowing.reverse().slice(3)
    let [following, setFollowing] = useState([])

    useEffect(() => {
        let localFollowing = JSON.parse(localStorage.getItem('following') || '[]');
        localFollowing.reverse()
        let followingList = localFollowing.join(',');

        setFollowing(localFollowing)
    }, [])

    if (localFollowing == 0) {
        return <>
            <PageTitle>Brands You <Link href={'/following'} className='inline-link'>Follow</Link></PageTitle>
            <EmptyState title={"You haven't followed any Brands yet."}>
                <p>Go to <Link className='inline-link' to={'/brands'}>All Brands</Link> and start following your favorite brands to keep up with their latest releases. Or explore our <Link className='inline-link' to={'/infinite-scroller'}>infinite scroll</Link> to discover new items and brands.</p>
            </EmptyState>
        </>
    }

    return <>
        <PageTitle>Brands You <Link href={'/following'} className='inline-link'>Follow</Link></PageTitle>
        {
            following.map((brand, index) => (
                <BrandScroller key={index} BrandInfo={<BrandInfo brand={brand} />} brand={brand} />
            ))

        }
    </>;
}

function BrandOfTheDay() {
    return <div className='brand-of-day-wrapper'>
        <h3 className='section-large'>Brand of The Day</h3>
        <BrandScroller title={''} BrandInfo={<BrandInfo brand={'taycan'} />} brand={'taycan'} />
    </div>;
}

