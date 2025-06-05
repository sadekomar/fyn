import { HttpService } from "@/lib/queries/http.service";
import { CategoriesI, ItemCardsI, MetadataI } from "@/lib/types";

export function getBrandItems(
  brand: string,
  queryString: string,
  isServer = true,
) {
  const httpService = new HttpService(isServer);
  return httpService.get<ItemCardsI[]>(`/items?brands=${brand}&${queryString}`);
}

export function getBrandMetadata(
  brand: string,
  queryString: string,
  isServer = true,
) {
  const httpService = new HttpService(isServer);
  return httpService.get<MetadataI>(
    `/items-metadata?brands=${brand}&${queryString}`,
  );
}

export function getBrandCategories(brand: string, isServer = true) {
  const httpService = new HttpService(isServer);
  return httpService.get<CategoriesI[]>(`/brand-categories?brands=${brand}`);
}
