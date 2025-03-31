import { GridLayout } from "@/layouts/GridLayout/GridLayout";
import { IPAddress } from "@/data/IPAddress";

export async function CategoryData({ category, searchParams }) {
  const fetchData = async (category, searchParams) => {
    const response = await fetch(
      `${IPAddress}/search?category=${category}&${searchParams.toString()}`,
    );
    return response.json();
  };

  const data = await fetchData(category, searchParams);

  return <></>;
}
