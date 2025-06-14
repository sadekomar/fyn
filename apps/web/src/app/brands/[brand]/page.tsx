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
  getBrand,
  getBrandCategories,
  getBrandItems,
  getBrandMetadata,
} from "./(utils)/read-brand";
import { Endpoints } from "@/api/endpoints";
import { getSessionAction } from "@/lib/auth";
import { postBrandView } from "@/api/brand-views";

export async function generateStaticParams() {
  const brands = await serverHttp.get<BrandsList>(Endpoints.Brands);

  return brands.map((brand) => ({ brand: brand.name }));
}

export async function generateMetadata(props: {
  params: Promise<{ brand: string }>;
}) {
  const params = await props.params;
  const brand = params.brand.replaceAll("%20", " ");

  return {
    title: brand,
    openGraph: {
      title: brand,
      description:
        "Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
      type: "website",
    },
  };
}

export const revalidate = 43200; // 12 hours in seconds

export default async function BrandPage(props: {
  params: Promise<{ brand: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const queryClient = new QueryClient();
  const { brand } = await props.params;
  const searchParams = await props.searchParams;

  const session = await getSessionAction();
  if (session) {
    await postBrandView({ brandName: brand, userId: session.userId });
  }

  const queryString = getQueryString(searchParams);
  const queryStringArray = getQueryStringArray(searchParams);

  await queryClient.prefetchQuery({
    queryKey: ["brands-list"],
    queryFn: () => serverHttp.get<BrandsList>(Endpoints.Brands),
  });
  await queryClient.prefetchQuery({
    queryKey: ["/brand", brand],
    queryFn: () => getBrand(brand),
  });
  await queryClient.prefetchQuery({
    queryKey: ["/brand-items", brand, ...queryStringArray],
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
