import React, { useState, useEffect } from 'react';
import { TextField, Box, Heading } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';


export function Search() {
    const [placeholder, setPlaceholder] = useState('Search...');
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const placeholders = [
            'Green hoodie',
            'Black crewneck',
            'White cargo pants',
            'Cielo jeans',
            'Linen shirt',
            'Juvenile knit hoodie',
            'Baggy denim',
            'Oversized hoodie'
        ];

        let index = 0;
        const intervalId = setInterval(() => {
            index = (index + 1) % placeholders.length;
            setIsTransitioning(true); // Trigger transition
            setTimeout(() => {
                setPlaceholder(placeholders[index]);
                setIsTransitioning(false); // End transition
            }, 300);
        }, 1500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
        <Box mx={{ initial: '4', sm: '5' }} my={{
            initial: '9',
            sm: '7',
        }} >
            <Heading>Search for Anything</Heading>
            <Heading size={'3'} mt={'1'} mb={'3'} weight={'medium'}>Have something specific in mind, we'll help you find it.</Heading>
        <motion.div
            whileTap={{ scale: 0.975 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.2 }}
        >
            <TextField.Root>
                <button
                    style={{
                        border: 'none',
                        background: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        outline: 'none',
                    }}
                >
                    <TextField.Slot>
                        <MagnifyingGlassIcon />
                    </TextField.Slot>
                </button>
                <TextField.Input
                    placeholder={placeholder}
                    id='search'
                    name='search'
                    radius='none'
                    className={isTransitioning ? 'placeholder-transition' : ''} />
            </TextField.Root>
        </motion.div>
        </Box>
        </>
    );
}
