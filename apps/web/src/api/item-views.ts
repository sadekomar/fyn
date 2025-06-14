import { HttpService } from "@/lib/queries/http.service";
import { Endpoints } from "./endpoints";
import {
  CreateItemViewRequest,
  CreateItemViewResponse,
} from "./types/item-view-types";

export function postItemView(data: CreateItemViewRequest, isServer = true) {
  const httpService = new HttpService(isServer);
  return httpService.post<CreateItemViewRequest, CreateItemViewResponse>(
    Endpoints.ItemView,
    data,
  );
}

export function getUserItemViews(userId: string, isServer = true) {
  const httpService = new HttpService(isServer);
  return httpService.get(Endpoints.UserItemViews.replace(":userId", userId));
}

export function getItemViewsCount(itemId: string, isServer = true) {
  const httpService = new HttpService(isServer);
  return httpService.get(Endpoints.ItemViewsCount.replace(":itemId", itemId));
}
