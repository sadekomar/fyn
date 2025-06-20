import { HttpService } from "@/lib/queries/http.service";
import { Endpoints } from "./endpoints";
import {
  CreateItemViewRequest,
  CreateItemViewResponse,
} from "./types/item-view-types";
import { ItemCardsI } from "@/lib/types";
import { getIdQuery } from "@/app/(utils)/utils";

export function postItemView(data: CreateItemViewRequest, isServer = true) {
  const httpService = new HttpService(isServer);
  return httpService.post<CreateItemViewRequest, CreateItemViewResponse>(
    Endpoints.ItemView,
    data,
  );
}

export function getItemViews(
  { type, id }: { type: "user" | "guest"; id: string },
  isServer = true,
): Promise<ItemCardsI[]> {
  const httpService = new HttpService(isServer);
  return httpService.get<ItemCardsI[]>(
    `${Endpoints.ItemViews}?type=${type}&${getIdQuery(id, type)}`,
  );
}

export function getItemViewsCount(itemId: string, isServer = true) {
  const httpService = new HttpService(isServer);
  return httpService.get(Endpoints.ItemViewsCount.replace(":itemId", itemId));
}
