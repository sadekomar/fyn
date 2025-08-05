import "./home.css";

import { serverHttp } from "@/lib/queries/http.service";
import { ItemCardsI } from "@/lib/types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ClientHomePage } from "./HomePage";
import { config } from "./utils";
import { ReadCategoriesResponse } from "../categories/[category]/(utils)/category-types";
import { Endpoints } from "@/api/endpoints";
// import { OnSaleCard } from "../item/[id]/item";

export const revalidate = 43200; // 12 hours in seconds

export const metadata = {
  title: "Loom Cairo: Shop 300 Local Fashion Brands in One Place",
  description:
    "Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
  robots:
    "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  keywords: "Loom Cairo, Local Brands, Fashion Brands, Egyptian Local Brands",
  openGraph: {
    title: "Loom Cairo: Shop 300 Local Fashion Brands in One Place",
    images: "https://capsuleegy.com/products/flip-flops-1",
    description:
      "Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
  twitter: {
    card: "summary",
    title: "Loom Cairo: Shop 300 Local Fashion Brands in One Place",
    description:
      "Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
  },
  alternates: {
    canonical: "https://loomcairo.com/",
  },
};

export default async function Home() {
  const queryClient = new QueryClient();

  // miscellaneous
  await queryClient.prefetchQuery({
    queryKey: ["home-items"],
    queryFn: () =>
      serverHttp.get<ItemCardsI[]>(
        `/items?limit=20&sort_by=date-descending&in_stock=true&is_partnered_brand=true`,
      ),
  });

  await queryClient.prefetchQuery({
    queryKey: ["brand-of-the-day", config.brandOfTheDay.value],
    queryFn: () =>
      serverHttp.get<ItemCardsI[]>(
        `/items?brands=${config.brandOfTheDay.value}&limit=20&sort_by=date-descending&in_stock=true&is_partnered_brand=true`,
      ),
  });

  await queryClient.prefetchQuery({
    queryKey: ["popular-categories"],
    queryFn: () =>
      serverHttp.get<ReadCategoriesResponse>(Endpoints.PopularCategories),
  });

  await queryClient.prefetchQuery({
    queryKey: ["more-categories"],
    queryFn: () =>
      serverHttp.get<ReadCategoriesResponse>(Endpoints.MoreCategories),
  });

  // await queryClient.prefetchQuery({
  //   queryKey: ["on-sale-items"],
  //   queryFn: () => serverHttp.get<OnSaleCard[]>(Endpoints.ItemsOnSale),
  // });

  // categories
  await queryClient.prefetchQuery({
    queryKey: ["home-tops"],
    queryFn: () =>
      serverHttp.get<ItemCardsI[]>(
        `/items?categories=tops&limit=20&sort_by=date-descending&in_stock=true&is_partnered_brand=true`,
      ),
  });

  await queryClient.prefetchQuery({
    queryKey: ["home-sets"],
    queryFn: () =>
      serverHttp.get<ItemCardsI[]>(
        `/items?categories=sets&limit=20&sort_by=date-descending&in_stock=true&is_partnered_brand=true`,
      ),
  });

  // materials
  await queryClient.prefetchQuery({
    queryKey: ["linens"],
    queryFn: () =>
      serverHttp.get<ItemCardsI[]>(
        `/items?materials=linen&limit=20&sort_by=date-descending&in_stock=true&is_partnered_brand=true`,
      ),
  });

  // colors
  await queryClient.prefetchQuery({
    queryKey: ["home-yellow"],
    queryFn: () =>
      serverHttp.get<ItemCardsI[]>(
        `/items?colors=yellow&limit=20&sort_by=date-descending&in_stock=true&is_partnered_brand=true`,
      ),
  });

  // brands
  await queryClient.prefetchQuery({
    queryKey: ["kloth"],
    queryFn: () =>
      serverHttp.get<ItemCardsI[]>(
        `/items?brands=kloth&limit=20&sort_by=date-descending&in_stock=true&is_partnered_brand=true`,
      ),
  });

  await queryClient.prefetchQuery({
    queryKey: ["locken"],
    queryFn: () =>
      serverHttp.get<ItemCardsI[]>(
        `/items?brands=locken&limit=20&sort_by=date-descending&in_stock=true&is_partnered_brand=true`,
      ),
  });
  await queryClient.prefetchQuery({
    queryKey: ["secret"],
    queryFn: () =>
      serverHttp.get<ItemCardsI[]>(
        `/items?brands=secret&limit=20&sort_by=date-descending&in_stock=true&is_partnered_brand=true`,
      ),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientHomePage />
    </HydrationBoundary>
  );
}
