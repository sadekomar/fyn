import { IPAddress } from "@/data/IPAddress";
import { CategorySelector } from "@/components/CategorySelector/CategorySelector";

export async function CategorySelectorFetch({ params, searchParams }) {
    
    const searchParamsObject = new URLSearchParams(searchParams);
    const response = await fetch(`${IPAddress}/metadata?brand=${params.brand}&${searchParamsObject.toString()}`);
    const metadata = await response.json();

    return <>
        <CategorySelector metadata={metadata} />
    </>;
}