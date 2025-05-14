import { HttpMethods, httpService } from "@/queries/http.service";
import { CategoriesI, ItemCardsI, MetadataI } from "@/types";

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

export function getBrandCategories(brand: string, isServer = true) {
  return httpService<CategoriesI[]>(
    HttpMethods.GET,
    `/brand-categories?brands=${brand}`,
    { isServer: isServer, isResponseJson: true },
  );
}
