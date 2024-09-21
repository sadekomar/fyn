"use client"

import { IPAddress } from "@/data/IPAddress";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { GridLayout } from "@/layouts/GridLayout/GridLayout";
import { GridPlaceholder } from "@/layouts/GridLayout/GridPlaceholder";

export function GridFetcher({ serverData }) {
    const params = useParams();
    const initialMount = useRef(true);
    const searchParams = useSearchParams();
    const [data, setData] = useState(serverData);
    const router = useRouter()

    useEffect(() => {
        if (!initialMount.current) {
            setData(null);
            fetch(`${IPAddress}/search?category=${params.category}&${searchParams.toString()}`)
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    setData(responseData);
                })
        }
        else {
            initialMount.current = false;
        }
    }, [searchParams]);

    return (<GridLayout products={data} />
    );
}