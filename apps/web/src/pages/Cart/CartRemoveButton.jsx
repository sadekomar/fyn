import { IconButton, Button } from '@radix-ui/themes';
import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';


export function CartRemoveButton({ id }) {
    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const inCart = cart.includes(id);
        setIsFilled(inCart);
    }, [id])

    const toggleIcon = (e) => {
        e.stopPropagation();
        setIsFilled((prevIsFilled) => !prevIsFilled);

        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (isFilled) {
            cart = cart.filter(likedId => likedId !== id);
        } else {
            cart.push(id);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    };

    return <>
        {
            <button className={`cart-button ${isFilled ? 'cart-button-added' : ''}`} onClick={toggleIcon}><HeartFilledIcon /></button>
        }
    </>;
}
