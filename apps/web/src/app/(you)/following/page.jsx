"use client"

import React, { useEffect, useState } from 'react';

import { BrandScroller } from '@/components/BrandScroller';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import { BrandInfo } from '@/components/BrandInfo';

import Link from 'next/link';


export default function FollowingBrands() {
    let [following, setFollowing] = useState([])

    useEffect(() => {
        let localFollowing = JSON.parse(localStorage.getItem('following') || '[]');
        localFollowing.reverse()
        let followingList = localFollowing.join(',');

        setFollowing(localFollowing)
    }, [])

    if (following.length == 0) {
        return <>
            <PageTitle>Following</PageTitle>
            <EmptyState title={"You haven't followed any Brands yet."}>
                <p>Go to <Link className='inline-link' href={'/brands'}>All Brands</Link> and start following your favorite brands to keep up with their latest releases. Or explore our <Link className='inline-link' href={'/infinite-scroller'}>infinite scroll</Link> to discover new items and brands.</p>
            </EmptyState>
        </>
    }

    return <>
        <PageTitle>Following</PageTitle>
        {
            following.map((brand, index) => (
                <BrandScroller key={index} BrandInfo={<BrandInfo brand={brand} />} brand={brand} />
            ))
        }
    </>;
}


