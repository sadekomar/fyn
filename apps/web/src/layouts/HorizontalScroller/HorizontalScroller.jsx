
import { ItemCard } from '../../components/ItemCard/ItemCard';
import { ItemCardPlaceholder } from '../../components/ItemCard/ItemCardPlaceholder';

import './HorizontalScroll.css'

export function HorizontalScroller({ items, children }) {
    let hasItems;
    if (items) {
        hasItems = items.length === 0;
    } else {
        hasItems = true;
    }
    return <div className='horizontalScroller'>
        {hasItems ?
            [...Array(20)].map((_, index) => (
                <ItemCardPlaceholder key={index} />
            )) :
            items.map((product, index) => (
                <ItemCard
                    key={index}
                    id={product['id']}
                    name={product['name']}
                    price={product['price']}
                    brand={product['brand']}
                    date={product['date']}
                    description={product['description']}
                    link={product['link']}
                    images={product['images']}
                    sizes={product['sizes']}
                    colors={product['colors']}
                    imgLoading='lazy' />
            ))}
        {children}
    </div>;

}
