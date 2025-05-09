import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getQueryString, getQueryStringArray } from "@/app/(utils)/utils";
import { getCategoryItems, getCategoryMetadata } from "./(utils)/read-category";
import { CategoryPageClient } from "./CategoryPage";

export default async function CategoryPage(props: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const queryClient = new QueryClient();
  const { category } = await props.params;
  const searchParams = await props.searchParams;

  const queryString = getQueryString(searchParams);
  const queryStringArray = getQueryStringArray(searchParams);

  await queryClient.prefetchQuery({
    queryKey: ["/category", category, ...queryStringArray],
    queryFn: () => getCategoryItems(category, queryString),
  });

  await queryClient.prefetchQuery({
    queryKey: [
      "/category-metadata",
      category,
      ...queryStringArray.filter(([key]) => key !== "page"),
    ],
    queryFn: () => getCategoryMetadata(category, queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryPageClient />
    </HydrationBoundary>
  );
}
