import { HttpMethods, httpService } from "@/queries/http.service";
import { ItemCardsI, MetadataI } from "@/types";

export function getBrandItems(
  brand: string,
  queryString: string,
  isServer = true,
) {
  return httpService<ItemCardsI[]>(
    HttpMethods.GET,
    `/items?brands=${brand}&${queryString}`,
    { isServer: isServer, isResponseJson: true },
  );
}

export function getBrandMetadata(
  brand: string,
  queryString: string,
  isServer = true,
) {
  return httpService<MetadataI>(
    HttpMethods.GET,
    `/items-metadata?brands=${brand}&${queryString}`,
    { isServer: isServer, isResponseJson: true },
  );
}
