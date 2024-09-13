import React, { useState, useEffect, useRef } from 'react';
import { Flex, ScrollArea, Text, Link } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { IPAddress } from '../../../data/IPAddress';
import { descriptionsAndLogos } from '../../../data/descriptionsAndLogos';

import { ScrollTitle } from '../../../layouts/HorizontalScroller/ScrollTitle';

export function ShopByBrand() {
    let [allBrandsData, setAllBrandsData] = useState(null)
    const scrollAreaRef = useRef(null);



    // useEffect(() => {
    //     fetch(`${IPAddress}/all-brands-data`)
    //         .then((response) => (response.json()), (reason) => (console.log(`Error due to ${reason}`)))
    //         .then((data) => {
    //             console.log(data)
    //             setAllBrandsData(data)
    //         })
    // }, [])

    // useEffect(()=>{
    //     setAllBrandsData(descriptionsAndLogos[brand] || {'description': 'Hello world', 'logo': ''})
    // }, [])


    return <>
        <ScrollTitle linkTitle={'Shop by Brand'} link={'/brands'} scrollAreaRef={scrollAreaRef}></ScrollTitle>
        <ScrollArea
            size="1"
            type="scroll"
            scrollbars="horizontal"
            ref={scrollAreaRef}
        >
            <Flex direction={'row'} gap={'6'} className='scrollFlex' mt={'2'} mb={'4'} style={{ borderTop: '4px solid gray', borderBottom: '4px solid gray' }} align={'center'} justify={'center'}>
                {
                    Object.keys(descriptionsAndLogos).map((brand, index) => (
                        <motion.div
                            whileTap={{ scale: 0.7 }}
                            whileHover={{ scale: 1.075 }}
                            transition={{ duration: 0.25 }}
                            key={index}
                        >
                            <Link href={`/brands/${brand}`}>
                                <img src={descriptionsAndLogos[brand].logo} width={'80px'} style={{ alignContent: 'center', objectFit: 'contain', justifyContent: 'center', height: '100px' }} />
                            </Link>
                        </motion.div>
                    ))
                }
            </Flex>
        </ScrollArea>
    </>;
}
