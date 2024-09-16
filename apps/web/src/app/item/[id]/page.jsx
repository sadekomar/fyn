import { Flex } from '@radix-ui/themes';
import Link from 'next/link';
import { Suspense } from 'react';

import './ItemPage.css'
import './ItemPagePlaceholder.css'

import { IPAddress } from '@/data/IPAddress';
import { SnapScroller } from '@/components/SnapScroller/SnapScroller';
import { BrandInfo } from '@/components/BrandInfo';
import { HorizontalScroller } from '@/layouts/HorizontalScroller/HorizontalScroller';
import { LikeButton } from '@/components/ItemCard/LikeButton';
import { RecentlyViewed } from './RecentlyViewed';
import { ShareButton } from '@/components/ShareButton';
import { AddToCart } from '@/pages/Cart/AddToCart';
import { BrandScroller } from '@/components/BrandScroller';
import { Accordion } from '@/components/Accordion/Accordion';
import { CompareButton } from '@/components/CompareButton';
import { SizesPicker } from './SizesPicker';
import { HScrollerPlaceholder } from '@/layouts/HorizontalScroller/HScrollerPlaceholder';
import { AddToRecentlyViewed } from '../AddToRecentlyViewed';
import { DesktopImages } from './DesktopImages';

export async function generateMetadata({ params }) {
    let response = await fetch(`${IPAddress}/id?id=${params.id}`)
    let data = await response.json()

    return {
        title: data.name,
        description: data.description.slice(0, 60),
        robots: 'index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large',
        keywords: 'Loom Cairo, Local Brands, Fashion Brands, Egyptian Local Brands',
        openGraph: {
            title: data.name,
            description: data.description.slice(0, 60),
            type: 'website',
            url: `https://loomcairo.com/item/${params.id}`,
        },
        twitter: {
            card: 'summary',
            title: data.name,
            description: data.description.slice(0, 60),
        },
        alternates: {
            canonical: `https://loomcairo.com/item/${params.id}`,
        },
    }
}

export default async function ItemPage({ params }) {
    let response = await fetch(`${IPAddress}/id?id=${params.id}`)
    let data = await response.json()

    const category = data['categories'][0]
    const color = data['colors'][0]
    const gender = data['gender']

    return <>
        <PhoneImages data={data} />
        <div className='ItemGrid'>
            <DesktopImages data={data} />
            <ItemData data={data} />
        </div >

        <Suspense fallback={<div className='gray-section-wrapper'><HScrollerPlaceholder /></div>}>
            <SimilarItems category={category} color={color} gender={gender} />
        </Suspense>

        <Suspense fallback={<HScrollerPlaceholder />}>
            <BrandScroller brand={data['brand']} title={'More from '} BrandInfo={<BrandInfo brand={data['brand']} />} />
        </Suspense>

        <RecentlyViewed />
        <AddToRecentlyViewed />
    </>
}

export async function SimilarItems({ category, color, gender }) {
    const response = await fetch(`${IPAddress}/search?category=${category}&color=${color}&limit=20&gender=${gender}`);
    const similarItems = await response.json()

    return <div className='gray-section-wrapper'>
        <div className='h-scroller-title'>
            <h2 className='scroller-text'>More from <Link className='brand-link' href={`/categories/${category}?color=${color}`}>{color} {category}</Link></h2>
        </div>
        <HorizontalScroller items={similarItems}></HorizontalScroller>
    </div>;
}

export function ItemData({ data }) {
    return <div className='ItemData'>
        <div className='item-data__wrapper'>
            <h2 className='item-data__title'>{data['name']}</h2>
            <p className='item-data__brand'>
                By <Link className='brand-link' href={`/brands/${data['brand']}`}>{data['brand']}</Link>
            </p>
            <p className='item-data__price'>LE {data['price'].toLocaleString()}.00</p>
        </div>

        <Flex direction={'column'} gap={'4'}>
            <Flex direction={'row'} gap={'2'}>
                <LikeButton id={data['id']} className={'ItemPage_Button'} />
                <ShareButton id={data['id']} name={data['name']} description={data['description']} className={'ItemPage_Button'} />
                <CompareButton id={data['id']} className={'ItemPage_Button'} />
            </Flex>

            <SizesPicker data={data} />

            <div className='action-buttons-wrapper'>
                <AddToCart id={data['id']} />
                <BuyNowLink data={data} />
            </div>

            <Accordion trigger={'Description'}>
                {data['description']}
            </Accordion>
            <div>
                <div className='sizes-title'>Colors</div>
                <div className='color-circles-wrapper'>
                    {
                        data['colors'].map((color, index) => (
                            <div className='color-circle' style={{ backgroundColor: color }} key={index}></div>
                        ))
                    }
                </div>
            </div>

            <div>
                <div className='sizes-title'>Material</div>
                <div className='item-info'>{data['material']}</div>
            </div>
            <div>
                <div className='sizes-title'>Gender</div>
                <div className='item-info'>{data['gender']}</div>
            </div>


        </Flex>
    </div>;
}

export function PhoneImages({ data, height = '440px' }) {
    return <div className='ItemImagePhoneDisplay'>
        <SnapScroller images={data['images']} height={height} />
    </div>;
}

export function BuyNowLink({ data }) {
    {/* link opens in a new tab which exposes loom to an attack that redirects the user through the window.opener object */ }
    return <>
        <a href={`${data.link}?ref=loomcairo`} target='_blank' rel='noopener noreferrer' className='buy-now-link'>
            <div className='buy-now-button'>
                <p>Buy from</p>
                <p style={{ textTransform: 'capitalize' }}>{data['brand']}</p>
            </div>
        </a>
    </>;
}