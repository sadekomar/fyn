import React, { useEffect } from 'react';
import { Link as Link, useParams } from 'react-router-dom';
import { Flex, Text, Button, Badge, Grid, IconButton, ScrollArea, Inset, Box, Link as RadixLink, Dialog } from '@radix-ui/themes';
import { Cross1Icon } from '@radix-ui/react-icons';

import './ItemModal.css'

import { BrandInfo } from '../BrandInfo';

import { SnapScroller } from './SnapScroller';
import { DesktopImage } from './DesktopImage';
import { LikeButton } from '../ItemCard/LikeButton';
import { ShareButton } from '../ShareButton';



export function ItemModal({ id, name, price, brand, description, images, date, sizes, link, closeModal }) {
    return (
        <>
            <Dialog.Content className='Modal' size={'0'}>
                <Flex direction={{
                    initial: 'column',
                    sm: 'row',
                }} gap="0">
                        <div className="Modal__ImageContainer">
                            <div className='Modal__SnapScrollerContainer'>
                                <SnapScroller images={images} />
                            </div>
                            <div className='Modal__DesktopImage'>
                                <DesktopImage images={images} />
                            </div>
                        </div>


                    <AddModalToHistory id={id} />

                    <Flex direction={'column'} justify={'between'} gap={'4'} className='Modal__TextContainer' style={{ maxWidth: '380px', padding: '1rem' }}>
                        <Flex gap={'1'} direction={'column'}>
                            <Flex direction={'row'} justify={'between'}>
                                <Dialog.Title className='Modal__Title' asChild>
                                    <Text>{name}</Text>
                                </Dialog.Title>

                                <Dialog.Close asChild>
                                    <IconButton variant='solid' className='Modal__XButton' >
                                        <Cross1Icon />
                                    </IconButton>
                                </Dialog.Close>
                            </Flex>

                            <Text as='h4' size="1">
                                By <BrandInfo brand={brand} />
                            </Text>

                            <Text as='h4'>
                                LE {price}
                            </Text>

                            <Flex direction={'row'} gap={'2'}>
                                <LikeButton id={id} />
                                <ShareButton id={id} name={name} description={description} />
                            </Flex>

                            <Text weight={'bold'}>Sizes</Text>
                            <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '250px', maxHeight: '82px', overflow: 'scroll' }}>
                                {
                                    sizes.map((size, index) => (
                                        (Object.values(size)[0]) ? (
                                            <Badge style={{ margin: '2px' }} variant='soft' color='sky' radius='medium' key={index}>{Object.keys(size)}</Badge>
                                        ) :
                                            (
                                                <Badge variant='soft' color='gray' radius='medium' key={index} style={{ textDecoration: 'line-through', margin: '2px' }}>{Object.keys(size)}</Badge>
                                            )
                                    ))
                                }
                            </div>
                            {/* total maxHeight 268px */}
                            <Text weight={'bold'}>Description</Text>
                            <Text size='1' as='p' style={{ whiteSpace: 'pre-wrap', maxHeight: '186px', overflow: 'scroll' }}>
                                {description}
                            </Text>


                        </Flex>

                        <Flex gap={'2'} align={'end'} justify={'end'}>
                            <Dialog.Close asChild className='Modal__CloseButton'>
                                <Button variant='soft' style={{ cursor: 'pointer' }}>Close</Button>
                            </Dialog.Close>
                            <Link href={`/item/${id}`}>
                                <Button variant='solid' color='cyan' style={{ cursor: 'pointer', textDecoration: 'none' }}>
                                    View Item
                                </Button>
                            </Link>
                        </Flex>
                    </Flex>

                </Flex>
            </Dialog.Content>
        </>
    );
}

function AddModalToHistory({ id }) {
    useEffect(() => {
        let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        let isRecentlyViewed = recentlyViewed.includes(id);
        if (isRecentlyViewed) {
            // Don't add it again.
            recentlyViewed = recentlyViewed.filter(itemId => itemId !== id);
            recentlyViewed.push(id);
        } else {
            recentlyViewed.push(id);
            if (recentlyViewed.length > 200) {
                recentlyViewed = recentlyViewed.slice(recentlyViewed.length - 200);
            }
        }
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    }, [])

    return <div>

    </div>;
}
