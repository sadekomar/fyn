"use client";

import { useQuery } from "@tanstack/react-query";

import "@/app/categories/[...category]/CategoryPage.css";

import { clientHttp } from "@/lib/queries/http.service";
import { GridLayout } from "@/layouts/GridLayout/GridLayout";
import { ItemCardsI, MetadataI } from "@/lib/types";
import { ColorPills } from "../(home)/(components)/color-pills";
import { FiltersAndCount } from "@/components/FiltersAndCount/FiltersAndCount";
import { PaginationControl } from "@/components/Pagination/PaginationControl";
import { ClyoImage } from "@/components/clyo-image";
import { useSearchParams } from "next/navigation";

export function ShopPageClient() {
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();
  const queryStringArray = Array.from(searchParams.entries());

  const { data } = useQuery<ItemCardsI[]>({
    queryKey: ["shop", ...queryStringArray],
    queryFn: () => clientHttp.get(`/items?limit=50&${queryString}`),
  });
  const { data: metadata } = useQuery<MetadataI>({
    queryKey: ["shop-metadata", ...queryStringArray],
    queryFn: () => clientHttp.get(`/items-metadata?limit=50&${queryString}`),
  });

  return (
    <>
      <div className="category-page-header">
        <ClyoImage src={"/shop.webp"} alt={"Shop"} />
        <div className="category-page-title-wrapper">
          <h2 className="category-page-title">Shop</h2>
        </div>
      </div>
      <ColorPills metadata={metadata} />
      <FiltersAndCount metadata={metadata} />
      <GridLayout items={data} />
      <PaginationControl metadata={metadata} />
    </>
  );
}
