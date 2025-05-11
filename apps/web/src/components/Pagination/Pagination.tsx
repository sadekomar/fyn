import { IPAddress } from "@/data/IPAddress";
import { PaginationControl } from "./PaginationControl";

// this is actually great in terms of security
// so my api is actually never exposed because the server streams the ready-made html and then hydrates it

export async function Pagination({
  params,
  searchParams,
}: {
  params: { brand?: string };
  searchParams: Record<string, string> | URLSearchParams;
}) {
  const searchParamsObject = new URLSearchParams(searchParams);

  // const response = await fetch(`${IPAddress}/metadata?brand=${params.brand}&${searchParamsObject.toString()}`);
  const response = await fetch(
    `${IPAddress}/metadata?${searchParamsObject.toString()}`,
  );
  const metadata = await response.json();

  const ITEMS_PER_PAGE = 100;
  const numberOfItems = metadata["item_count"] || 0;
  const numberOfPages = Math.ceil(numberOfItems / ITEMS_PER_PAGE);
  const pageNumbers = Array.from(
    { length: numberOfPages },
    (_, index) => index + 1,
  );

  return (
    <>
      <PaginationControl metadata={metadata} />
    </>
  );
}
