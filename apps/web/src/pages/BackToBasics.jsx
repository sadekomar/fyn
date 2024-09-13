import React, { useEffect, useState, useRef } from 'react';
import { BrandInfo } from '../components/BrandInfo';
import { Helmet } from 'react-helmet';
import { BrandScroller } from '../components/BrandScroller';

import { PageTitle } from '../components/PageTitle/PageTitle';

export function BackToBasics() {
    let backToBasics = ['the basic look', 'organdy', 'terre']

    return <>
        <Helmet>
            <title>Basics</title>
        </Helmet>
        <PageTitle>Basics</PageTitle>
        
        {
            backToBasics.map((brand, index) => (
                <BrandScroller key={index} BrandInfo={<BrandInfo brand={brand} />} brand={brand} />
            ))
        }
    </>;
}