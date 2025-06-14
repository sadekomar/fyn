import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getQueryString, getQueryStringArray } from "@/app/(utils)/utils";
import { getCategoryItems, getCategoryMetadata } from "./(utils)/read-category";
import { CategoryPageClient } from "./CategoryPage";
import { serverHttp } from "@/lib/queries/http.service";
import { Endpoints } from "@/api/endpoints";
import { getSessionAction } from "@/lib/auth";
import { postCategoryView } from "@/api/category-views";

export const revalidate = 43200; // 12 hours in seconds

export async function generateStaticParams() {
  const categories = await serverHttp.get<{ id: string; name: string }[]>(
    Endpoints.Categories,
  );

  return categories.map((category) => ({ category: category.name }));
}

export async function generateMetadata(props: {
  params: Promise<{ category: string }>;
}) {
  const params = await props.params;
  const category = params.category.replaceAll("%20", " ");

  return {
    title: category,
    openGraph: {
      title: category,
      description:
        "Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
      type: "website",
    },
  };
}

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
