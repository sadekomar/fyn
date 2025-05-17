import { HttpMethods, httpService } from "@/lib/queries/http.service";
import { ItemCardsI, MetadataI } from "@/lib/types";

export function getCategoryItems(
  category: string,
  queryString: string,
  isServer = true,
) {
  return httpService<ItemCardsI[]>(
    HttpMethods.GET,
    `/items?categories=${category}&${queryString}&limit=50`,
    { isResponseJson: true, isServer: isServer },
  );
}

export function getCategoryMetadata(
  category: string,
  queryString: string,
  isServer = true,
) {
  return httpService<MetadataI>(
    HttpMethods.GET,
    `/items-metadata?categories=${category}&${queryString}`,
    { isResponseJson: true, isServer: isServer },
  );
}
