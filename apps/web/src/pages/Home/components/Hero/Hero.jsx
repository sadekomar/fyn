import React, { useState, useEffect } from 'react';

import './Hero.css'

export function Hero() {
    let [numberOfBrands, setNumberOfBrands] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (numberOfBrands < 260) {
                setNumberOfBrands(previousNumberOfBrands => previousNumberOfBrands + 1);
            } else {
                clearInterval(interval);
            }
        });

        return () => clearInterval(interval);
    }, [numberOfBrands]);

    return <>
        <div className='hero-wrapper'>
            <h1 className='hero-text'>Egypt's First Fashion <span className='hero-text-highlight'>Search En<span className='stylized-g'>g</span>ine</span></h1>
        </div>
    </>;
}
