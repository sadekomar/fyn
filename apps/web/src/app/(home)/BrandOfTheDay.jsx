import { BrandInfo } from "@/components/BrandInfo";
import { BrandScroller } from "@/components/BrandScroller";

export function BrandOfTheDay({ brand }) {
    return <div className='brand-of-day-wrapper'>
        <h3 className='section-large'>Brand of The Day</h3>
        <BrandScroller title={''} BrandInfo={<BrandInfo brand={brand} />} brand={brand} />
    </div>;
}