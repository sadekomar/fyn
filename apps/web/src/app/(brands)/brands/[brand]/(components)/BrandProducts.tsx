import { IPAddress } from "@/data/IPAddress";
import { GridLayout } from "@/layouts/GridLayout/GridLayout";

export async function BrandProducts({
  params,
  searchParams,
}: {
  params: { brand: string };
  searchParams: Record<string, string> | URLSearchParams;
}) {
  const searchParamsObject = new URLSearchParams(searchParams);
  const productsResponse = await fetch(
    `${IPAddress}/search?brand=${params.brand}&${searchParamsObject.toString()}`,
  );
  const productsData = await productsResponse.json();
  const products = productsData || null;

  return <GridLayout items={products} />;
}
