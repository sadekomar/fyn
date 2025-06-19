import { createCategoryView } from "./create-category-view";
import {
  readCategoryViewsCount,
  readUserCategoryViews,
} from "./read-category-views";

export { createCategoryView, readCategoryViewsCount, readUserCategoryViews };

// Create
type CreateCategoryViewGuestRequest = {
  type: "guest";
  categoryName: string;
  guestUserId: string;
};

type CreateCategoryViewUserRequest = {
  type: "user";
  categoryName: string;
  userId: string;
};

export type CreateCategoryViewRequest =
  | CreateCategoryViewGuestRequest
  | CreateCategoryViewUserRequest;

export type CreateCategoryViewResponse = {
  status: "success" | "error";
  message: string;
};

// Read
export type ReadCategoryViewRequest = {
  userId?: string;
  guestUserId?: string;
};

export type ReadCategoryViewResponse = {
  id: string;
  name: string;
};
