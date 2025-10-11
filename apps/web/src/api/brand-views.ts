import { HttpService } from "@/lib/queries/http.service";
import { Endpoints } from "./endpoints";
import {
  CreateBrandViewRequest,
  CreateBrandViewResponse,
} from "./types/brand-view-types";

export function postBrandView(data: CreateBrandViewRequest, isServer = true) {
  const httpService = new HttpService(isServer);
  return httpService.post<CreateBrandViewRequest, CreateBrandViewResponse>(
    Endpoints.BrandView,
    data,
  );
}

export function getUserBrandViews(userId: string, isServer = true) {
  const httpService = new HttpService(isServer);
  return httpService.get(Endpoints.UserBrandViews.replace(":userId", userId));
}

export function getBrandViewsCount(brandId: string, isServer = true) {
  const httpService = new HttpService(isServer);
  return httpService.get(
    Endpoints.BrandViewsCount.replace(":brandId", brandId),
  );
}
