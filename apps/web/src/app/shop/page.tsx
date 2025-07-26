import { serverHttp } from "@/lib/queries/http.service";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { ShopPageClient } from "./shop-page";
import { getQueryString, getQueryStringArray } from "../(utils)/utils";

export default async function ShopPage(props: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const queryClient = new QueryClient();
  const searchParams = await props.searchParams;

  const queryString = getQueryString(searchParams);
  const queryStringArray = getQueryStringArray(searchParams);

  await queryClient.prefetchQuery({
    queryKey: ["shop", ...queryStringArray],
    queryFn: () => serverHttp.get(`/items?limit=50&${queryString}`),
  });
  await queryClient.prefetchQuery({
    queryKey: ["shop-metadata", ...queryStringArray],
    queryFn: () => serverHttp.get(`/items-metadata?limit=50&${queryString}`),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShopPageClient />
    </HydrationBoundary>
  );
}
