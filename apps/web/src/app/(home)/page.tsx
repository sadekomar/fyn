import "./home.css";

import { serverHttp } from "@/lib/queries/http.service";
import { ItemCardsI } from "@/lib/types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ClientHomePage } from "./HomePage";
import { conifg } from "./utils";

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
    description:
      "Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
    type: "website",
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

  await queryClient.prefetchQuery({
    queryKey: ["home-items"],
    queryFn: () =>
      serverHttp.get<ItemCardsI[]>(
        `/items?limit=20&sort_by=popularity-descending`,
      ),
  });

  await queryClient.prefetchQuery({
    queryKey: ["home-daddys-girl"],
    queryFn: () =>
      serverHttp.get<ItemCardsI[]>(
        `/items?brands=daddysgirl&sort_by=date-descending&limit=20`,
      ),
  });

  await queryClient.prefetchQuery({
    queryKey: ["home-pants"],
    queryFn: () =>
      serverHttp.get<ItemCardsI[]>(`/items?categories=pants&limit=20`),
  });

  await queryClient.prefetchQuery({
    queryKey: ["home-sets"],
    queryFn: () =>
      serverHttp.get<ItemCardsI[]>(`/items?categories=sets&limit=20`),
  });

  await queryClient.prefetchQuery({
    queryKey: ["home-jeans"],
    queryFn: () =>
      serverHttp.get<ItemCardsI[]>(`/items?categories=jeans&limit=20`),
  });

  await queryClient.prefetchQuery({
    queryKey: ["latest-brand", conifg.latestFromBrand.value],
    queryFn: () =>
      serverHttp.get<ItemCardsI[]>(
        `/items?brands=${conifg.latestFromBrand.value}&limit=20&sort_by=date-descending`,
      ),
  });

  await queryClient.prefetchQuery({
    queryKey: ["brand-of-the-day", conifg.brandOfTheDay.value],
    queryFn: () =>
      serverHttp.get<ItemCardsI[]>(
        `/items?brands=${conifg.brandOfTheDay.value}&limit=20&sort_by=date-descending`,
      ),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientHomePage />
    </HydrationBoundary>
  );
}
