
import { ItemCard } from '../../components/ItemCard/ItemCard';

import './HorizontalScroll.css'

export function HorizontalScroller({ items, children }) {

    return <div className='horizontalScroller'>
        {
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
