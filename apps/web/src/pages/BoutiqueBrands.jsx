import React, { useEffect, useState } from 'react';
import { Box } from '@radix-ui/themes';
import { Helmet } from 'react-helmet';

import { IPAddress } from '../data/IPAddress';
import { useRef } from 'react';

import { HorizontalScroller } from '../layouts/HorizontalScroller/HorizontalScroller';
import { BrandInfo } from '../components/BrandInfo';

import { BrandScroller } from '../components/BrandScroller';
import { PageTitle } from '../components/PageTitle/PageTitle';


export function BoutiqueBrands() {
    let [brandsList, setBrandsList] = useState([]);

    useEffect(() => {
        fetch((`${IPAddress}/small-brands`))
            .then((responseObject) => (responseObject.json()), (reason) => (console.log(reason)))
            .then((data) => {
                if (data) {
                    setBrandsList(data)
                }
            })
            .catch(error => {
                console.log("Couldn't fetch boutique-brands list")
            })
    }, []);


    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const observerRef = useRef(null);

    useEffect(() => {
        if (!observerRef.current) return;

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && brandsList.length > 0) {
                setCurrentPage(prevPage => prevPage + 1);
            }
        });

        observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [brandsList]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return <>
        <Helmet>
            <title>Boutique Brands</title>
        </Helmet>
        <PageTitle>Boutique Brands</PageTitle>
        <p className='page-description'>Discover our curated selection of boutique brands, featuring unique and exclusive collections with 15 items or fewer. These limited-edition offerings showcase the essence of craftsmanship and individuality, providing you with truly special pieces.</p>        {
            (brandsList.length > 0) && (
                brandsList.slice(0, endIndex).map((brand, index) => (
                    <BrandScroller key={index} BrandInfo={<BrandInfo brand={brand} />} brand={brand} />
                ))
            )
        }
        {
            (brandsList.length == 0) && (
                [...Array(5)].map((_, index) => (
                    <HorizontalScroller key={index} />
                ))
            )
        }
        <div ref={observerRef} style={{ height: '10px', background: 'transparent' }}></div>
    </>;
}