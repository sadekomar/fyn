import { IPAddress } from '@/data/IPAddress';

import { BrandInfo } from '@/components/BrandInfo';
import { BrandScroller } from '@/components/BrandScroller';
import { PageTitle } from '@/components/PageTitle/PageTitle';

export default async function BoutiqueBrands() {
    const response = await fetch((`${IPAddress}/small-brands`));
    const brandsList = await response.json();

    const itemsPerPage = 10;
    const currentPage = 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return <>
        <PageTitle>Boutique Brands</PageTitle>
        <p className='page-description'>Discover our curated selection of boutique brands, featuring unique and exclusive collections with 15 items or fewer. These limited-edition offerings showcase the essence of craftsmanship and individuality, providing you with truly special pieces.</p>
        {
            brandsList.slice(0, endIndex).map((brand, index) => (
                <BrandScroller key={index} BrandInfo={<BrandInfo brand={brand} />} brand={brand} />
            ))
        }
    </>;
}