import { useEffect, useState } from 'react';

import { CartCard } from './CartCard';
import Link from 'next/link';
import { EmptyState } from '../../components/EmptyState/EmptyState';

export function CartLayout({ products, removeCard, isEmpty }) {
    return <>
        <div className="cart-cards-wrapper">
            {
                (products.length != 0) || (!isEmpty) ?
                    products.map((product, index) => (
                        <CartCard key={index} product={product} removeCard={removeCard} />
                    )) :
                    <EmptyState title='Your cart is empty'>
                        <p>Check your <Link className='inline-link' to={'/liked-items'}>likes</Link> or <Link className='inline-link' to={'/all-categories'}>continue shopping</Link>.</p>
                    </EmptyState>
            }
        </div>
    </>;
}


