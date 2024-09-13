import { Flex, ScrollArea, IconButton, Text, Card } from '@radix-ui/themes';
import { CaretLeftIcon, CaretRightIcon } from '@radix-ui/react-icons'
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

import './HorizontalScroll.css'

import { IPAddress } from '../../data/IPAddress';
import { FollowButton } from '../../pages/FollowButton'

import { ItemCard } from '../../components/ItemCard/ItemCard';
import { ItemCardPlaceholder } from '../../components/ItemCard/ItemCardPlaceholder';


export function HorizontalScroll({ brand, title, BrandInfo }) {
    let [items, setItems] = useState([])
    // const [loading, setLoading] = useState(false);
    // const scrollAreaRef = useRef(null);
    // let [lastIndex, setLastIndex] = useState(8)
    // const lastItemRef = useRef(null);

    useEffect(() => {
        setItems([])
        fetch((`${IPAddress}/search?brand=${brand}&limit=20&sort_by=date-descending`))
            .then((responseObject) => (responseObject.json()))
            .then((data) => {
                console.log(data)
                setItems(data || [])
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            })

    }, []);

    let hasItems = items.length === 0;

    return <>

        <div className='h-scroller-title'>
            <Text size={'7'} weight={'bold'}>
                {title}
                {BrandInfo}
            </Text>
            <FollowButton brand={brand} />
        </div>

        <div className='horizontalScroller'>
            {
                hasItems ?
                    [...Array(20)].map((_, index) => (
                        <ItemCardPlaceholder key={index} />
                    )) :
                    items.map((product, index) => (
                        <ItemCard
                            key={index}
                            id={product['id']}
                            name={product['name']}
                            price={product['price']}
                            brand={product['brand']}
                            date={product['date']}
                            description={product['description']}
                            link={product['link']}
                            images={product['images']}
                            sizes={product['sizes']}
                            imgLoading='lazy'
                            className="ItemCard--horizontalScroller"
                        />
                    ))

            }
            <ViewBrandCard brand={brand} />
        </div>
    </>
}

function ViewBrandCard({ brand }) {
    return <Link href={`/brands/${brand}`} style={{ textDecoration: 'none', color: 'gray' }}>
        <Card style={{
            maxWidth: '285px',
            height: 'auto',
            textDecoration: 'none'
        }}
            size="0"
            variant='ghost'
        >
            <div
                style={{
                    display: 'block',
                    objectFit: 'contain',
                    width: '100%',
                    maxWidth: '100%',
                    height: '340px',
                    backgroundColor: 'var(--gray-5)',
                    borderRadius: '8px',
                }}>
                <h1 style={{
                    display: 'flex',
                    height: '100%',
                    margin: '0px',
                    alignItems: 'center',
                    justifyContent: "center",
                }}>
                    View Brand
                </h1>
            </div>
        </Card>
    </Link>;
}
