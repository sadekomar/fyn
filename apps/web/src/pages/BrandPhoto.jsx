import { Flex, Text, Heading, HoverCard, Box, Link, Avatar } from '@radix-ui/themes';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { descriptionsAndLogos } from '../data/descriptionsAndLogos';
import { IPAddress } from '../data/IPAddress';

export function BrandPhoto({ brand }) {
    let [brandData, setBrandData] = useState(descriptionsAndLogos[brand] || { 'description': `${brand} is a clothing brand.`, 'logo': '' })

    useEffect(()=>{
        setBrandData(descriptionsAndLogos[brand] || { 'description': `${brand} is a clothing brand.`, 'logo': '' })
    }, [])



    return (
        <>
            <Text>
                <HoverCard.Root>
                    <HoverCard.Trigger>
                        <motion.div
                            whileTap={{ scale: 0.7 }}
                            whileHover={{ scale: 1.075 }}
                            transition={{ duration: 0.25 }}
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            <Link href={`/brands/${brand}`}>
                                <img src={brandData['logo']} style={{
                                    margin: '15px', objectFit: 'contain', width: '100px',
                                }} />
                            </Link>
                        </motion.div>
                    </HoverCard.Trigger>
                    <HoverCard.Content>
                        <Flex gap="4">
                            <Avatar
                                size="3"
                                radius="full"
                                src={brandData['logo']} />
                            <Box>
                                <Heading size="3" as="h3" style={{ textTransform: 'capitalize' }}>
                                    {brand}
                                </Heading>
                                <Text as="div" size="2" color="gray" style={{ textTransform: 'capitalize' }}>
                                    @{brand}
                                </Text>

                                <Text as="div" size="2" style={{ maxWidth: 300 }} mt="3">
                                    {brandData['description']}
                                </Text>
                            </Box>
                        </Flex>
                    </HoverCard.Content>
                </HoverCard.Root>
            </Text>
        </>
    );
}