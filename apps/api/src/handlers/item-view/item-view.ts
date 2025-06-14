import { createItemView } from "./create-item-view";
import { readItemViewsCount } from "./read-item-views";
import { readUserItemViews } from "./read-item-views";

export { createItemView, readItemViewsCount, readUserItemViews };

export type CreateItemViewRequest = {
  itemId: string;
  userId: string;
};

export type CreateItemViewResponse = {
  status: "success" | "error";
  message: string;
};
