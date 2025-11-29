import "./AllBrands.css";
import { serverHttp } from "@/lib/queries/http.service";
import { Endpoints } from "@/api/endpoints";
import BrandPage from "./BrandPage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const metadata = {
  title: "All Brands",
  description:
    "Find everything you need on Clyo Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
  robots:
    "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  keywords: "Clyo Cairo, Local Brands, Fashion Brands, Egyptian Local Brands",
  openGraph: {
    title: "All Brands",
    description:
      "Find everything you need on Clyo Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "All Brands",
    description:
      "Find everything you need on Clyo Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
  },
};

export type BrandsAPI = {
  [key: string]: { id: string; name: string }[];
};

export default async function AllBrands() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["/brands"],
    queryFn: () => serverHttp.get<BrandsAPI>(Endpoints.BrandsAlphabetical),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BrandPage />
    </HydrationBoundary>
  );
}
