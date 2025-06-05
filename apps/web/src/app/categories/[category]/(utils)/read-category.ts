import { HttpService } from "@/lib/queries/http.service";
import { ItemCardsI, MetadataI } from "@/lib/types";

export function getCategoryItems(
  category: string,
  queryString: string,
  isServer = true,
) {
  const httpService = new HttpService(isServer);

  return httpService.get<ItemCardsI[]>(
    `/items?categories=${category}&${queryString}&limit=50`,
  );
}

export function getCategoryMetadata(
  category: string,
  queryString: string,
  isServer = true,
) {
  const httpService = new HttpService(isServer);

  return httpService.get<MetadataI>(
    `/items-metadata?categories=${category}&${queryString}`,
  );
}
