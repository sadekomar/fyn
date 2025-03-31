import { IPAddress } from "@/data/IPAddress";
import { FiltersAndCount } from "@/components/FiltersAndCount/FiltersAndCount";

export async function FiltersAndCountFetch({ params, searchParams }) {
  const searchParamsObject = new URLSearchParams(searchParams);
  const response = await fetch(
    `${IPAddress}/metadata?brand=${params.brand}&${searchParamsObject.toString()}`,
  );
  const metadata = await response.json();

  const numberOfItems = metadata["item_count"] || 0;

  return (
    <>
      <FiltersAndCount metadata={metadata} numberOfItems={numberOfItems} />
    </>
  );
}
