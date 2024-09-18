import { HorizontalScroller } from "@/layouts/HorizontalScroller/HorizontalScroller";
import { IPAddress } from "@/data/IPAddress";
import Link from "next/link";

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