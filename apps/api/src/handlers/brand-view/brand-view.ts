import { createBrandView } from "./create-brand-view";
import { readBrandViewsCount, readUserBrandViews } from "./read-brand-view";

export { createBrandView, readBrandViewsCount, readUserBrandViews };

// Create
export type CreateBrandViewRequest = {
  brandName: string;
  userId: string;
};

export type CreateBrandViewResponse = {
  status: "success" | "error";
  message: string;
};

// Read
export type ReadBrandViewRequest = {
  userId: string;
};

export type ReadBrandViewResponse = {
  id: string;
  name: string;
};
