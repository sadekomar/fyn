import { CaretLeftIcon, CaretRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { GridLayout } from "@/layouts/GridLayout/GridLayout";
import { FollowButton } from "@/components/FollowButton/FollowButton";
import { heroImages } from "@/data/heroImages";
import { IPAddress } from '@/data/IPAddress';

import './BrandPage.css'
// import '../SearchPage/SearchPage.css'


// import { Pagination } from '@/components/Pagination/Pagination';
// import { CategorySelector } from '@/components/CategorySelector/CategorySelector';
// import { FiltersAndCount } from '@/components/FiltersAndCount/FiltersAndCount';

import { BrandsNavigator } from './BrandsNavigator';
import { LoomImage } from "./LoomImage";
import { BrandDescription } from './BrandDescription';

export async function generateMetadata({ params, searchParams }) {
    const brand = params.brand

    // const brand = await fetch(`https://.../${id}`).then((res) => res.json())
    return {
        title: brand,
        openGraph: {
            title: params.brand,
            description: 'Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.',
            type: 'website',
        },
    }
}

export default async function BrandPage({ params, searchParams }) {
    const brand = params.brand
    const fetchData = async () => {
        try {
            const productsResponse = await fetch(`${IPAddress}/search?brand=${params.brand}&${searchParams.toString()}`);
            const productsData = await productsResponse.json();
            const products = productsData || null;
            const coverImage = productsData[0]?.['images'][0] || null;

            const metadataResponse = await fetch(`${IPAddress}/metadata?brand=${params.brand}&${searchParams.toString()}`);
            const metadataData = await metadataResponse.json();
            const metadata = metadataData;
            const numberOfItems = metadataData['item_count'] || 0;

            return { products, coverImage, metadata, numberOfItems };
        } catch (error) {
            console.log(error);
            return { products: null, coverImage: null, metadata: {}, numberOfItems: 0 };
        }
    };

    const { products, coverImage, metadata, numberOfItems } = await fetchData();
    const response = await fetch(`${IPAddress}/brands-list`);
    const brandsList = await response.json();

    function getHeroImage() {
        if (heroImages[params.brand]) {
            let displayImage = heroImages[params.brand];
            displayImage.replace('loom-image-dimensions', '300')
            return displayImage;
        } else {
            if (coverImage) {
                return coverImage['src'];
            }
        }
    }

    return <>
        <div className="brand-page-wrapper">
            <BrandsNavigator params={params} brandsList={brandsList} />

            <div className="BrandImageContainer">
                <LoomImage getHeroImage={getHeroImage()} />
                <div className="BrandContainer">
                    <div className="brand-info-wrapper">
                        <h2 className="brand-name">{params.brand}</h2>
                        <FollowButton className={'follow-button-white'} brand={params.brand} />
                    </div>
                    <BrandDescription brand={brand} />
                    <div className="brand-nav-buttons-wrapper">
                        <Link className="brand-nav-button" href={`/brands/${brandsList[(brandsList.indexOf(params.brand) - 1 + brandsList.length) % brandsList.length]}?${searchParams.toString()}`}>
                            <CaretLeftIcon width='25px' height='25px' /> Previous Brand
                        </Link>
                        <Link className="brand-nav-button" href={`/brands/${brandsList[(brandsList.indexOf(params.brand) + 1 + brandsList.length) % brandsList.length]}?${searchParams.toString()}`}>
                            Next Brand
                            <CaretRightIcon width='25px' height='25px' />
                        </Link>
                    </div>
                </div>
            </div >

            {/* <CategorySelector metadata={metadata} searchParams={searchParams} setSearchParams={setSearchParams} />

            <FiltersAndCount searchParams={searchParams} setSearchParams={setSearchParams} metadata={metadata} numberOfItems={numberOfItems} /> */}
            <GridLayout products={products} />
            {/* <Pagination searchParams={searchParams} setSearchParams={setSearchParams} numberOfItems={numberOfItems} /> */}
        </div>
        <div>

        </div>

    </>;
}


