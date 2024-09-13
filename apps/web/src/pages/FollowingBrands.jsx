import React, { useEffect, useState, useRef } from 'react';
import { BrandInfo } from '../components/BrandInfo';
import { Helmet } from 'react-helmet';
import { BrandScroller } from '../components/BrandScroller';
import { EmptyState } from '../components/EmptyState/EmptyState';

import { PageTitle } from '../components/PageTitle/PageTitle';
import Link from 'next/link';


export function FollowingBrands() {
    const localFollowing = JSON.parse(localStorage.getItem('following') || '[]')
    localFollowing.reverse()
    let [following, setFollowing] = useState([])

    useEffect(() => {
        let localFollowing = JSON.parse(localStorage.getItem('following') || '[]');
        localFollowing.reverse()
        let followingList = localFollowing.join(',');

        setFollowing(localFollowing)
    }, [])

    if (localFollowing == 0) {
        return <>
            <Helmet>
                <title>Following Brands</title>
            </Helmet>
            <PageTitle>Following</PageTitle>
            <EmptyState title={"You haven't followed any Brands yet."}>
                <p>Go to <Link className='inline-link' to={'/brands'}>All Brands</Link> and start following your favorite brands to keep up with their latest releases. Or explore our <Link className='inline-link' to={'/infinite-scroller'}>infinite scroll</Link> to discover new items and brands.</p>
            </EmptyState>
        </>
    }

    return <>
        <Helmet>
            <title>Following Brands</title>
        </Helmet>
        <PageTitle>Following</PageTitle>
        {
            following.map((brand, index) => (
                <BrandScroller key={index} BrandInfo={<BrandInfo brand={brand} />} brand={brand} />
            ))
        }
    </>;
}


