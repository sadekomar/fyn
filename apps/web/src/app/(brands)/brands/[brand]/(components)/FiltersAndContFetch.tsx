import { IPAddress } from "@/data/IPAddress";
import { FiltersAndCount } from "@/components/FiltersAndCount/FiltersAndCount";

export async function FiltersAndCountFetch({
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
      <FiltersAndCount metadata={metadata} />
    </>
  );
}
