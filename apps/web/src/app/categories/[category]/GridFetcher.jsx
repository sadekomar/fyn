"use client"

import { IPAddress } from "@/data/IPAddress";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { GridLayout } from "@/layouts/GridLayout/GridLayout";
import { GridPlaceholder } from "@/layouts/GridLayout/GridPlaceholder";
import useSWRMutation from 'swr/mutation'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export function GridFetcher({ serverData, revalidateServerData }) {
    const params = useParams();
    const isFirstMount = useRef(true);
    const searchParams = useSearchParams();

    const [displayData, setDisplayData] = useState(serverData);

    const endpoint = `${IPAddress}/search?category=${params.category}&${searchParams.toString()}`;
    const { data, trigger, isMutating } = useSWRMutation(endpoint, fetcher);

    useEffect(() => {
        if (!isFirstMount.current) {
            console.log('filters changed: fetched through client')
            trigger().then(newData => {
                setDisplayData(newData);
            });
            revalidateServerData();
        }
        else {
            isFirstMount.current = false;
        }
    }, [searchParams]);

    if (isMutating) return <GridPlaceholder />

    return (<GridLayout products={displayData} />);
}