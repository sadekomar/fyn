import { createItemView } from "./create-item-view";
import { readItemViewsCount } from "./read-item-views";
import { readUserItemViews } from "./read-item-views";
import { deleteItemViews } from "./delete-item-views";

export {
  createItemView,
  readItemViewsCount,
  readUserItemViews,
  deleteItemViews,
};

// create
type CreateItemViewGuestRequest = {
  type: "guest";
  itemId: string;
  guestUserId: string;
};

export type CreateItemViewUserRequest = {
  type: "user";
  itemId: string;
  userId: string;
};

export type CreateItemViewRequest =
  | CreateItemViewGuestRequest
  | CreateItemViewUserRequest;

export type CreateItemViewResponse = {
  status: "success" | "error";
  message: string;
};

// read
type ReadItemViewsGuestRequest = {
  type: "guest";
  guestUserId: string;
};

type ReadItemViewsUserRequest = {
  type: "user";
  userId: string;
};

export type ReadItemViewsRequest =
  | ReadItemViewsGuestRequest
  | ReadItemViewsUserRequest;
