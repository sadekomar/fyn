import React from 'react';
import { Flex, IconButton, Text, Heading, Box, Link } from '@radix-ui/themes';
import { CaretLeftIcon, CaretRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export function ScrollTitle({ title, BrandInfo, children, link, linkTitle, scrollAreaRef }) {
    function scrollLeft() {
        scrollAreaRef.current.scrollLeft -= 250;
    }
    function scrollRight() {
        scrollAreaRef.current.scrollLeft += 250;
    }
    
    return <>
        <Flex justify={'between'} align={'center'}
            pt={'1'} pb={'0'}>
            {
                title &&
                <Text as='div' size={'7'} weight={'bold'}>
                    {title}
                    {BrandInfo}
                </Text>
            }
            {
                link &&
                <Text as='div' size={'7'} weight={'bold'}>
                    <Link asChild>
                        <Link href={`${link}`} >
                            {linkTitle}
                        </Link>
                    </Link>
                </Text>

            }
            <Flex gap={'3'}>
                <IconButton size={{
                    initial: '2',
                    sm: '4',
                }} variant='soft' radius='full' onClick={scrollLeft}>
                    <CaretLeftIcon width='25px' height='25px' />
                </IconButton>
                <IconButton size={{
                    initial: '2',
                    sm: '4',
                }} variant='soft' radius='full' onClick={scrollRight}>
                    <CaretRightIcon width='25px' height='25px' />
                </IconButton>
            </Flex>
        </Flex>
        <Text>
            {children}
        </Text>

    </>;
}
