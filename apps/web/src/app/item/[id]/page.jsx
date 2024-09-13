import { Flex, Dialog, IconButton } from '@radix-ui/themes';
import { Cross1Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

import './ItemPage.css'
import './ItemPagePlaceholder.css'

import { IPAddress } from '@/data/IPAddress';

import { SnapScroller } from '@/components/ItemModal/SnapScroller';
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


export default async function ItemPage({ params }) {
    let response = await fetch(`${IPAddress}/id?id=${params.id}`)
    let data = await response.json()

    const metadata = {
        title: (data) => data?.['name'] || 'Loading...',
        description: (data) => data?.['description'] || '',
        robots: 'index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large',
        keywords: 'Loom Cairo, Local Brands, Fashion Brands, Egyptian Local Brands',
        openGraph: {
            title: (data) => data?.['name'] || 'Loom Cairo',
            description: (data) => data?.['description']?.slice(0, 160) || '',
            type: 'website',
            url: (params) => `https://loomcairo.com/${params["id"]}`,
        },
        twitter: {
            card: 'summary',
            title: (data) => data?.['name'] || 'Loom Cairo',
            description: (data) => data?.['description']?.slice(0, 160) || '',
        },
        alternates: {
            canonical: (params) => `https://loomcairo.com/item/${params["id"]}`,
        },
    }

    const category = data['categories'][0]
    const color = data['colors'][0]
    const gender = data['gender']


    // useEffect(() => {
    //     // Add item to recently viewed
    //     let id = parseInt(params.id)
    //     let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    //     let isRecentlyViewed = recentlyViewed.includes(id);
    //     if (isRecentlyViewed) {
    //         recentlyViewed = recentlyViewed.filter(itemId => itemId !== id);
    //         recentlyViewed.push(id);
    //     } else {
    //         recentlyViewed.push(id);
    //         if (recentlyViewed.length > 200) {
    //             recentlyViewed = recentlyViewed.slice(recentlyViewed.length - 200);
    //         }
    //     }
    //     localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    // }, [params])

    return <>
        <PhoneImages data={data} />
        <div className='ItemGrid'>
            <DesktopImages data={data} />
            <ItemData data={data} />
        </div >

        {
            (category && gender) ?
                <SimilarItems category={category} color={color} gender={gender} /> :
                <>
                    {/* placeholder */}
                    <div className='gray-section-wrapper'>
                        <div className='h-scroller-title'>
                            <div className='scroller-title-placeholder'></div>
                        </div>
                        <HorizontalScroller />
                    </div>
                </>
        }
        {
            (data) ?
                <BrandScroller brand={data['brand']} title={'More from '} BrandInfo={<BrandInfo brand={data['brand']} />} /> :
                <>
                    {/* placeholder */}
                    <div className='h-scroller-title'>
                        <h2 className='scroller-text'></h2>
                    </div>
                    <HorizontalScroller />
                </>
        }
        <RecentlyViewed />
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
    // const [selectedColor, setSelectedColor] = useState(null);

    return <div className='ItemData'>
        {(data) ?
            <>
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
            </> :
            ItemDataPlaceholder()
        }
    </div>;
}

export function ItemDataPlaceholder() {
    return <div className='itempage-placeholder-wrapper'>
        <div className='image-pills-wrapper'>
            <div className='image-pill image-pill-selected'></div>
            <div className='image-pill'></div>
            <div className='image-pill'></div>
            <div className='image-pill'></div>
        </div>
        <div className='name-placeholder'></div>
        <div className='brand-placeholder'></div>
        <div className='price-placeholder'></div>
        <div className='share-like-placeholder-wrapper'>
            <LikeButton className={'ItemPage_Button'} />
            <ShareButton className={'ItemPage_Button'} />
        </div>
        <div className='sizes-title-placeholder'></div>
        <div className='sizes-placeholders-wrapper'>
            <div className='sizes-placeholder'></div>
            <div className='sizes-placeholder'></div>
            <div className='sizes-placeholder'></div>
        </div>
        <div className='cart-button-placeholder'></div>
        <div className='buy-button-placeholder'></div>
    </div>;
}

export function PhoneImages({ data, height = '440px' }) {
    return <div className='ItemImagePhoneDisplay'>
        {(data) ?
            <SnapScroller images={data['images']} height={height} />
            : <div style={{ height: height, backgroundColor: 'rgb(224, 224, 224)' }}></div>
        }
    </div>;
}

function DesktopImages({ data }) {
    return <div className="ItemImage ItemImageComputerDisplay">
        <Dialog.Root>
            {data && data['images'].map((image, index) => (
                <Dialog.Trigger key={index}>
                    <img key={index} style={{ width: '100%' }} src={image['src']} srcSet={image['srcset']} sizes='410px' alt="" />
                </Dialog.Trigger>
            ))}
            <Dialog.Content style={{ width: '100lvw', maxWidth: '100lvw', height: '100lvh', maxHeight: '100lvh', padding: '0px', marginInline: '0px', paddingInline: '120px', position: 'relative' }}>
                <Dialog.Close>
                    <IconButton variant='soft' radius='full' style={{ right: '25px', top: '25px', position: 'fixed' }}>
                        <Cross1Icon />
                    </IconButton>
                </Dialog.Close>
                {data && data['images'].map((image, index) => (
                    <img key={index} style={{ width: '100%' }} src={image['src']} srcSet={image['srcset']} sizes='1080px' alt="" />
                ))}
            </Dialog.Content>
        </Dialog.Root>
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