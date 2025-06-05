import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { BrandPageClient } from "./BrandPage";
import { serverHttp } from "@/lib/queries/http.service";
import { BrandsList } from "@/lib/types";
import { getQueryString, getQueryStringArray } from "@/app/(utils)/utils";
import {
  getBrandCategories,
  getBrandItems,
  getBrandMetadata,
} from "./(utils)/read-brand";
import { Endpoints } from "@/lib/endpoints";

export async function generateStaticParams() {
  const brands = await serverHttp.get<BrandsList>(Endpoints.Brands);

  return brands.map((brand) => ({ brand: brand.name }));
}

export const revalidate = 43200; // 12 hours in seconds

export default async function BrandPage(props: {
  params: Promise<{ brand: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const queryClient = new QueryClient();
  const { brand } = await props.params;
  const searchParams = await props.searchParams;

  const queryString = getQueryString(searchParams);
  const queryStringArray = getQueryStringArray(searchParams);

  await queryClient.prefetchQuery({
    queryKey: ["brands-list"],
    queryFn: () => serverHttp.get<BrandsList>(Endpoints.Brands),
  });

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
  await queryClient.prefetchQuery({
    queryKey: ["/brand-categories", brand],
    queryFn: () => getBrandCategories(brand),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BrandPageClient />
    </HydrationBoundary>
  );
}
