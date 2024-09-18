"use client"

import React, { useEffect, useRef, useState } from 'react';

import '../../item/[id]/ItemPage.css'

import { IPAddress } from '@/data/IPAddress';
import { GridLayout } from '@/layouts/GridLayout/GridLayout';
import { EmptyState } from '@/components/EmptyState/EmptyState';

import { PageTitle } from '@/components/PageTitle/PageTitle';
import { ItemCardPlaceholder } from '@/components/ItemCard/ItemCardPlaceholder';
import Link from 'next/link';


export default function LikesPage() {
    const abortControllerRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        const likes = JSON.parse(localStorage.getItem('likes') || '[]');
        likes.reverse();
        const likesString = likes.join(',');

        async function fetchData() {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            setIsLoading(true)

            try {
                if (likes != 0) {
                    const response = await fetch(`${IPAddress}/ids?ids=${likesString}`, {
                        signal: abortControllerRef.current?.signal,
                    });
                    const data = (await response.json());
                    setProducts(data);
                }
                else {
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

        fetchData();
    }, [])

    if (isLoading) {
        return <>
            <PageTitle>Likes</PageTitle>
            <div className="wrapper">
                <div className="grid">
                    {[...Array(100)].map((_, index) => (
                        <ItemCardPlaceholder key={index} />
                    )
                    )}
                </div>
            </div>
        </>;
    }


    if (error) {
        return <div>An error occurred</div>
    }

    if (isEmpty) {
        return <>
            <PageTitle>Likes</PageTitle>
            <EmptyState title={'There are no likes yet'}>
                <p>There are no liked items yet. <Link className='inline-link' to={'/all-categories'}>Continue shopping</Link> our wide range of products and click the heart icon to save your favorites here for easy access. Happy <Link className='inline-link' to={'/all-categories'}>shopping</Link>!</p>
            </EmptyState>
        </>;
    }

    return <>
        <PageTitle>Likes</PageTitle>
        <GridLayout products={products} />
    </>
}

