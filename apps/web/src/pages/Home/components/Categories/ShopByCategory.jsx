import React from 'react';
import { Flex, Box, ScrollArea, Heading, Text, Link } from '@radix-ui/themes';

import { categories } from '../../../../data/categories';
import Link from 'next/link';

// import '../Featured/FeaturedSection.css'
import './Categories.css'

export function ShopByCategory() {
    return <>
        <div className='categories-wrapper'>
            <Link href={'/categories/jeans'}>
                <div className="category">
                    <img src="/home/jeans.webp" alt="Jeans category" />
                    <div className='category-title-wrapper'>
                        <h3 className='category-title' href="">Jeans</h3>
                    </div>
                </div>
            </Link>
            <Link href={'/categories/t-shirts'}>
                <div className="category">
                    <img src="/home/t-shirts.webp" alt="T-shirts category" />
                    <div className='category-title-wrapper'>
                        <h3 className='category-title' href="">T-Shirts</h3>
                    </div>
                </div>
            </Link>
            <Link href={'/categories/cargos'}>
                <div className="category">
                    <img src="/home/cargos.webp" alt="Cargos category" />
                    <div className='category-title-wrapper'>
                        <h3 className='category-title' href="">Cargos</h3>
                    </div>
                </div>
            </Link>
            <Link href={'/categories/shirts'}>
                <div className="category">
                    <img src="/home/shirts.webp" alt="Shirts category" />
                    <div className='category-title-wrapper'>
                        <h3 className='category-title' href="">Shirts</h3>
                    </div>
                </div>
            </Link>
        </div>
    </>;
}
