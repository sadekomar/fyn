import { Suspense } from 'react';
import Link from 'next/link';

import './ItemPage.css';
import './ItemPagePlaceholder.css';

import { IPAddress } from '@/data/IPAddress';
import { SnapScroller } from '@/components/SnapScroller/SnapScroller';
import { BrandInfo } from '@/components/BrandInfo';
import { RecentlyViewed } from './RecentlyViewed';
import { SimilarItems } from './SimilarItems';

import { BrandScroller } from '@/components/BrandScroller';
import { ItemData } from './ItemData';
import { HScrollerPlaceholder } from '@/layouts/HorizontalScroller/HScrollerPlaceholder';
import { AddToRecentlyViewed } from '../AddToRecentlyViewed';
import { DesktopImages } from './DesktopImages';

// export async function generateMetadata({ params }) {
//     let response = await fetch(`${IPAddress}/id?id=${params.id}`)
//     let data = await response.json()

//     return {
//         title: data.name,
//         description: data.description.slice(0, 60),
//         robots: 'index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large',
//         keywords: 'Loom Cairo, Local Brands, Fashion Brands, Egyptian Local Brands',
//         openGraph: {
//             title: data.name,
//             description: data.description.slice(0, 60),
//             type: 'website',
//             url: `https://loomcairo.com/item/${params.id}`,
//         },
//         twitter: {
//             card: 'summary',
//             title: data.name,
//             description: data.description.slice(0, 60),
//         },
//         alternates: {
//             canonical: `https://loomcairo.com/item/${params.id}`,
//         },
//     }
// }

export default async function ItemPage({ params }) {
    let response = await fetch(`${IPAddress}/id?id=${params.id}`)
    let data = await response.json()

    const category = data['categories'][0]
    const color = data['colors'][0]
    const gender = data['gender']
    return <>
        {/* <PhoneImages data={data} /> */}
        <SnapScroller images={data['images']} />
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
    </>;
}

// export function PhoneImages({ data, height = '440px' }) {
//     return <div className='ItemImagePhoneDisplay'>
//         <SnapScroller images={data['images']} height={height} />
//     </div>;
// }