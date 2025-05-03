"use client";

import { IPAddress } from "@/data/IPAddress";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { GridLayout } from "@/layouts/GridLayout/GridLayout";
import { GridPlaceholder } from "@/layouts/GridLayout/GridPlaceholder";
import useSWRMutation from "swr/mutation";
import { ItemCardsI } from "@/types";

const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export function GridFetcher({
  serverData,
  revalidateServerData,
  page,
}: {
  serverData: ItemCardsI[];
  revalidateServerData: (params: {}) => void;
  page: string;
}) {
  const params = useParams();
  const isFirstMount = useRef(true);
  const searchParams: URLSearchParams = useSearchParams();

  console.log("GridFetcher server data: ", serverData);

  const [displayData, setDisplayData] = useState(serverData);

  const endpoint = `${IPAddress}/search?${page}=${params[page]}&${searchParams.toString()}`;
  const { data, trigger, isMutating } = useSWRMutation(endpoint, fetcher);

  useEffect(() => {
    if (!isFirstMount.current) {
      console.log("filters changed: fetched through client");
      trigger().then((newData) => {
        setDisplayData(newData);
      });
      revalidateServerData(params);
    } else {
      isFirstMount.current = false;
    }
  }, [searchParams]);

  if (isMutating) return <GridPlaceholder />;

  return <GridLayout items={displayData} />;
}
