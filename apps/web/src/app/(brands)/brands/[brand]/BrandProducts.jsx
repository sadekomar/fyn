import { IPAddress } from "@/data/IPAddress";
import { GridLayout } from "@/layouts/GridLayout/GridLayout";

export async function BrandProducts({ params, searchParams }) {
    const searchParamsObject = new URLSearchParams(searchParams);
    const productsResponse = await fetch(`${IPAddress}/search?brand=${params.brand}&${searchParamsObject.toString()}`);
    const productsData = await productsResponse.json();
    const products = productsData || null;

    return <GridLayout products={products} />;
}
