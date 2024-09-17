import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';

import { BrandInfo } from '../components/BrandInfo';

import { BrandScroller } from '../components/BrandScroller'
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../components/PageTitle/PageTitle';

export function NamesToKnow() {
    let namesToKnow = ['aesthete', 'almah', 'ausetia', 'baggy collective', 'baynoire', 'brown toast', 'cielo', 'cocan', 'daddysgirl', 'totelly', 'horra', 'juvenile', 'kika', 'kncpt', 'fsociety', 'locken', 'najlah', 'notfound', 'quwa', 'richa', 'warped']

    const navigate = useNavigate();

    useEffect(() => {
        navigate(`#page${1}`);
    }, [navigate]);


    return <>
        <Helmet>
            <title>Names to Know</title>
        </Helmet>
        <PageTitle>Names to Know</PageTitle>
        {
            namesToKnow.map((brand, index) => (
                <BrandScroller key={index} BrandInfo={<BrandInfo brand={brand} />} brand={brand} />
            ))
        }
    </>;
}
