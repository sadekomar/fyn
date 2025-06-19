import { createBrandView } from "./create-brand-view";
import { readBrandViewsCount, readUserBrandViews } from "./read-brand-view";

export { createBrandView, readBrandViewsCount, readUserBrandViews };

// Create
type CreateBrandViewGuestRequest = {
  type: "guest";
  brandName: string;
  guestUserId: string;
};

type CreateBrandViewUserRequest = {
  type: "user";
  brandName: string;
  userId: string;
};

export type CreateBrandViewRequest =
  | CreateBrandViewGuestRequest
  | CreateBrandViewUserRequest;

export type CreateBrandViewResponse = {
  status: "success" | "error";
  message: string;
};

// Read
export type ReadBrandViewRequest = {
  userId?: string;
  guestUserId?: string;
};

export type ReadBrandViewResponse = {
  id: string;
  name: string;
};
