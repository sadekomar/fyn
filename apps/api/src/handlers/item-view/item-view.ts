import { createItemView } from "./create-item-view";
import { readItemViewsCount } from "./read-item-views";
import { readUserItemViews } from "./read-item-views";

export { createItemView, readItemViewsCount, readUserItemViews };

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
