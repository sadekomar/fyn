"use client"

// React window fixed size list
import React, { useEffect, useRef, useState } from 'react';
import { FixedSizeList as List } from 'react-window';

import { IPAddress } from '../data/IPAddress';

import { BrandScroller } from '@/components/BrandScroller';
import { HorizontalScroller } from '../layouts/HorizontalScroller/HorizontalScroller';
import { BrandInfo } from '@/components/BrandInfo';

export function InfiniteScroller() {
    const [brandsList, setBrandsList] = useState([]);
    const listRef = useRef();

    useEffect(() => {
        fetch(`${IPAddress}/brands-list`)
            .then(response => response.json())
            .then(data => setBrandsList(data))
            .catch(error => console.error('Error fetching brands:', error));
    }, []);

    const Row = ({ index, style }) => {
        const brand = brandsList[index];
        console.log(index);
        localStorage.setItem('infinite-scroll', index);
        return (
            <div style={style}>
                <BrandScroller BrandInfo={<BrandInfo brand={brand} />} brand={brand} />
            </div>
        );
    };


    return (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'auto', backgroundColor: 'white', marginTop: '56px' }}>
            {brandsList.length > 0 ? (
                <List
                    initialScrollOffset={localStorage.getItem('infinite-scroll') * 440}
                    height={1000}
                    itemCount={brandsList.length}
                    itemSize={510}
                    width={'100%'}
                    ref={listRef}
                >
                    {Row}
                </List>
            ) : (
                [...Array(5)].map((_, index) => (
                    <HorizontalScroller key={index} />
                ))
            )}
        </div>
    );
}