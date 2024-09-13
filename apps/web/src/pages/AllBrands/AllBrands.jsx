import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link as Link } from "react-router-dom";
import { motion } from 'framer-motion';

import { IPAddress } from "../../data/IPAddress";
import { BrandInfo } from "../../components/BrandInfo";
import { BrandPhoto } from "../BrandPhoto";
import { IsometricBrands } from "../Home/components/Brands/IsometricBrands";
import './AllBrands.css'


export function AllBrands() {
    let [brands, setBrands] = useState({})

    useEffect(() => {
        fetch((`${IPAddress}/brands-list?group-alphabetically=1`))
            .then((responseObject) => (responseObject.json()))
            .then((data) => {
                setBrands(data)
            })
    }, []);

    let scrollToLetter = (letterClicked) => {
        let section = document.querySelector(`a[href='#${letterClicked}'`)
        console.log(section)
        section.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'start'
        });
    }

    return <>
    <Helmet>
        <title>All Brands</title>
    </Helmet>
        <div>
            <div className="alpha-index-container">
                {
                    Object.keys(brands).map((initialLetter, index) => (
                        <p className="alpha-index" key={index} style={{ cursor: 'pointer' }} onClick={() => { scrollToLetter(initialLetter) }}>{initialLetter}</p>
                    ))
                }
            </div>


            <div className='all-brands-title-wrapper'>
                <h2 className='all-brands-title'>All Brands</h2>
                <IsometricBrands />
            </div>

            {
                Object.keys(brands).map((initialLetter, index) => (
                    <div key={index}>
                        <a className="letter-label" href={`#${initialLetter}`}>{initialLetter}</a>
                        <ul className="brands-container">
                            {
                                brands[initialLetter].map((brand, index) => (
                                    <li key={index} className="brandLink--li">
                                        <Link href={`/brands/${brand}`} className="brandLink">
                                            {brand}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ))
            }
            <br /><br /><br />
        </div>

    </>;
}