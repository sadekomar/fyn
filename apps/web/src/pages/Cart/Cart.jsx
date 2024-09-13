import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';

import { IPAddress } from '../../data/IPAddress';
import { CartLayout } from '../../layouts/CartLayout/CartLayout';
import { removeFromLocalStorage, getFromLocalStorage } from '../../utils/localStorageUtils';

import './CartPage.css'

export function Cart() {
    let [subtotal, setSubtotal] = useState(0);
    const abortControllerRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);

    async function fetchData(cart) {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        setIsLoading(true)

        let cartString = cart.join(',');

        try {
            if (cart != 0) {
                const response = await fetch(`${IPAddress}/ids?ids=${cartString}`, {
                    signal: abortControllerRef.current?.signal,
                });
                const data = (await response.json());
                setProducts(data);
                let total = 0;
                for (let i = 0; i < data.length; i++) {
                    total += data[i].price;
                }
                setSubtotal(total)
            }
            else {
                setProducts([])
                setSubtotal(0)
                setIsEmpty(true);
            }
        }
        catch (e) {
            if (e.name == 'AbortError') {
                return;
            }
            setError(e);
        }
        setIsLoading(false);
    }

    
    useEffect(() => {
        const cart = getFromLocalStorage('cart');
        fetchData(cart);
    }, [])
    
    if (error) {
        return <div>An error ocurred</div>;
    }
    
    function removeCard(key, value) {
        removeFromLocalStorage(key, value);
        let cart = getFromLocalStorage(key);
        fetchData(cart);
    }



    return <>
        <Helmet>
            <title>Cart</title>
        </Helmet>
        <div className='cart-page-header'>
            <h2>Your Cart</h2>
            <p>When you're ready to make a purchase, we will direct you to the original website to complete your transaction.</p>
        </div>
        <div className='cart-wrapper'>
            <CartLayout products={products} removeCard={removeCard} isEmpty={isEmpty} />
            <div className='cart-page-footer'>
                <div className='subtotal-wrapper'>
                    <span>Subtotal</span>
                    <span className='subtotal-amount'>LE {subtotal.toLocaleString()}.00</span>
                </div>
                <p className='subtotal-note'>Please note, you can only purchase items directly from their respective websites.</p>
            </div>
        </div>
    </>;
}
