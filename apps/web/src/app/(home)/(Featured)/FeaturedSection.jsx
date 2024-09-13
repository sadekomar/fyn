import React from 'react';
import { Flex, Heading, Grid, Box, Link } from '@radix-ui/themes';
import Link from 'next/link';

import './FeaturedSection.css'

export function FeaturedSection() {
    return <Flex mx={{ initial: '4', sm: '5' }} gap={'4'} direction={'column'} pb={'5'}>
        <Heading size={'7'}>Featured</Heading>

        <Grid columns={{ initial: '2', sm: '3', md: '4' }} gap={'5'}>

            <Box className='categoryContainer'>
                <img src="jeansCategory.png" className='categoryImage' />
                <Link weight={'bold'} className='categoryText' asChild>
                    <Link href={'/jeans'}>Shop Jeans</Link>
                </Link>
            </Box>

            <Box className='categoryContainer'>
                <img src="jeansCategory.png" className='categoryImage' />
                <Link weight={'bold'} className='categoryText' asChild>
                    <Link href={'/tee'}>Shop Tees</Link>
                </Link>
            </Box>

            <Box className='categoryContainer'>
                <img src="jeansCategory.png" className='categoryImage' />
                <Link weight={'bold'} className='categoryText' asChild>
                    <Link href={'/hoodie'}>Shop Hoodies</Link>
                </Link>
            </Box>

            <Box className='categoryContainer'>
                <img src="jeansCategory.png" className='categoryImage' />
                <Link weight={'bold'} className='categoryText' asChild>
                    <Link href={'/pants'}>Shop Pants</Link>
                </Link>
            </Box>

        </Grid>
    </Flex>;
}
