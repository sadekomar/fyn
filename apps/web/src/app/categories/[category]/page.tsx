import "./CategoryPage.css";

import { GridLayout } from "@/layouts/GridLayout/GridLayout";
import { ColorPills } from "@/app/(home)/(ColorPills)/ColorPills";

import { newCategories } from "@/data/categories";
import { FiltersAndCount } from "@/components/FiltersAndCount/FiltersAndCount";
import { revalidatePath } from "next/cache";
import { HttpMethods, httpService } from "@/queries/http.service";
import { MetadataI } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}) {
  function capitalizeWords(string: string) {
    const parsedWords = string.split(" ");
    parsedWords.forEach((word) => {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    });
    return parsedWords.join(" ");
  }

  return {
    title: capitalizeWords(params.category),
  };
}

async function revalidateServerData(params: { category: string }) {
  "use server";
  revalidatePath(`/categories/${params.category}`);
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: URLSearchParams;
}) {
  // const fetchMetadata = async (category) => {
  //   const searchParamsObject = new URLSearchParams(searchParams);
  //   const metadataResponse = await fetch(
  //     `${IPAddress}/metadata?category=${category}&${searchParamsObject.toString()}`,
  //   );
  //   return metadataResponse.json();
  // };

  const searchParamsObject: URLSearchParams = new URLSearchParams(searchParams);

  let data, metadata: MetadataI;
  [data, metadata] = await Promise.all([
    httpService(
      HttpMethods.GET,
      `/items?categories=${params.category}&${searchParamsObject.toString()}&limit=50`,
    ),
    httpService(
      HttpMethods.GET,
      `/metadata?categories=${params.category}&${searchParamsObject.toString()}&limit=50`,
    ),
  ]);

  return (
    <>
      <div className="category-page-header">
        <img src={newCategories[params["category"]]?.["image"] || ""} alt="" />
        <div className="category-page-title-wrapper">
          <h2 className="category-page-title">{params["category"]}</h2>
        </div>
      </div>

      <ColorPills metadata={metadata} />
      <FiltersAndCount metadata={metadata} />
      <GridLayout items={data} />
      {/* <PaginationControl metadata={metadata} /> */}
    </>
  );
}
