import { createCategoryView } from "./create-category-view";
import {
  readCategoryViewsCount,
  readUserCategoryViews,
} from "./read-category-views";

export { createCategoryView, readCategoryViewsCount, readUserCategoryViews };

// Create
export type CreateCategoryViewRequest = {
  categoryName: string;
  userId: string;
};

export type CreateCategoryViewResponse = {
  status: "success" | "error";
  message: string;
};

// Read
export type ReadCategoryViewRequest = {
  userId: string;
};

export type ReadCategoryViewResponse = {
  id: string;
  name: string;
};
