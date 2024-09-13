"use client"

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { IPAddress } from '@/data/IPAddress';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { HorizontalScroller } from '@/layouts/HorizontalScroller/HorizontalScroller';


export function RecentlyViewed() {
    let [products, setProducts] = useState('')
    let recentlyViewed = [];
    
    useEffect(() => {
        recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        recentlyViewed.reverse();
        const fetchProductsFromServer = (recentlyViewedString) => {
            setProducts('')
            fetch(`${IPAddress}/ids?ids=${recentlyViewedString}`)
                .then((response) => (response.json()))
                .then((data) => {
                    setProducts(data)
                })
                .catch(e => {
                    console.log("Error fetching data", e);
                })

        }

        let recentlyViewedString = recentlyViewed.join(',');
        fetchProductsFromServer(recentlyViewedString);

        const updateRecentlyViewed = (event) => {
            console.log('updateRecentlyViewed executing')
            if (event.key === 'recentlyViewed') {
                const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
                recentlyViewed.reverse();
                let recentlyViewedString = recentlyViewed.join(',');

                fetchProductsFromServer(recentlyViewedString);
            }
        }

        window.addEventListener('storage', updateRecentlyViewed);

        return () => {
            window.removeEventListener('storage', updateRecentlyViewed);
        }
    }, [])

    if (recentlyViewed.length == 0) {
        return <>
            <PageTitle><Link href={'/history'} className="inline-link">Recently Viewed</Link></PageTitle>
            <EmptyState title={"You haven't viewed anything yet."}>
                <p><Link className='inline-link' href={'/all-categories'}>Continue shopping</Link> our wide range of items and the ones you viewed will appear here.
                    <br /><br />
                    Not sure what you're looking for exactly? Explore our <Link className='inline-link' href={'/infinite-scroller'}>Infinite Brands</Link> to discover new items and brands.</p>
            </EmptyState>
        </>
    }

    return <>
        <div className='h-scroller-title'>
            <Link className='h-scroller-title-link' to={'/history'} >
                Recently Viewed
            </Link>
        </div>
        <PageTitle><Link href={'/history'} className="inline-link">Recently Viewed</Link></PageTitle>

        <HorizontalScroller items={products} />
    </>
}