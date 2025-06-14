import { HttpService } from "@/lib/queries/http.service";
import { Endpoints } from "./endpoints";
import {
  CreateCategoryViewRequest,
  CreateCategoryViewResponse,
} from "./types/category-view-types";

export function postCategoryView(
  data: CreateCategoryViewRequest,
  isServer = true,
) {
  const httpService = new HttpService(isServer);
  return httpService.post<
    CreateCategoryViewRequest,
    CreateCategoryViewResponse
  >(Endpoints.CategoryView, data);
}

export function getUserCategoryViews(userId: string, isServer = true) {
  const httpService = new HttpService(isServer);
  return httpService.get(
    Endpoints.UserCategoryViews.replace(":userId", userId),
  );
}

export function getCategoryViewsCount(categoryId: string, isServer = true) {
  const httpService = new HttpService(isServer);
  return httpService.get(
    Endpoints.CategoryViewsCount.replace(":categoryId", categoryId),
  );
}
