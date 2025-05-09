import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { BrandPageClient } from "./BrandPage";
import { HttpMethods, httpService } from "@/queries/http.service";
import { ItemCardsI } from "@/types";
import { getQueryString, getQueryStringArray } from "@/app/(utils)/utils";
import { getBrandItems, getBrandMetadata } from "./(utils)/read-brand";

export default async function BrandPage(props: {
  params: Promise<{ brand: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const queryClient = new QueryClient();
  const { brand } = await props.params;
  const searchParams = await props.searchParams;

  const queryString = getQueryString(searchParams);
  const queryStringArray = getQueryStringArray(searchParams);

  // await queryClient.prefetchQuery({
  //   queryKey: ["brands-list"],
  //   queryFn: () => httpService(HttpMethods.GET, "/brands-list"),
  // });

  await queryClient.prefetchQuery({
    queryKey: ["/brand", brand, ...queryStringArray],
    queryFn: () => getBrandItems(brand, queryString),
  });
  await queryClient.prefetchQuery({
    queryKey: [
      "/brand-metadata",
      brand,
      ...queryStringArray.filter(([key]) => key !== "page"),
    ],
    queryFn: () => getBrandMetadata(brand, queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BrandPageClient />
    </HydrationBoundary>
  );
}
