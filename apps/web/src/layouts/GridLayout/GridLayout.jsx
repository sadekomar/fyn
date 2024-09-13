import './GridLayout.css'

import { ItemCard } from '../../components/ItemCard/ItemCard';
import { ItemCardPlaceholder } from '../../components/ItemCard/ItemCardPlaceholder';

export function GridLayout({ products, emptyState }) {
    return <>
        <div className="wrapper">
            <div className="grid">
                {
                    (products && products.length != 0) ?
                    products.map((product, index) => (
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
                            gender={product['gender']}
                            material={product['material']}
                            category={product['category']}
                            color={product['color']}
                            colors={product['colors']}
                        />
                    )) :
                    [...Array(100)].map((_, index) => (
                        <ItemCardPlaceholder key={index} />
                    )
                    )
                }
            </div>
        </div>
    </>;
}