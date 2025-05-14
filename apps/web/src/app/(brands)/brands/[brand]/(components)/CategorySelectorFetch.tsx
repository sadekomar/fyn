import { IPAddress } from "@/data/IPAddress";
import { CategorySelector } from "@/components/CategorySelector/CategorySelector";

export async function CategorySelectorFetch({
  params,
  searchParams,
}: {
  params: { brand: string };
  searchParams: Record<string, string> | URLSearchParams;
}) {
  const searchParamsObject = new URLSearchParams(searchParams);
  const response = await fetch(
    `${IPAddress}/metadata?brand=${params.brand}&${searchParamsObject.toString()}`,
  );
  const metadata = await response.json();

  return (
    <>
      <CategorySelector brandCategories={metadata} />
    </>
  );
}
