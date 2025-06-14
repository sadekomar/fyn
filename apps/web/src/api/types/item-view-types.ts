export type CreateItemViewRequest = {
  itemId: string;
  userId: string;
};

export type CreateItemViewResponse = {
  status: "success" | "error";
  message: string;
};
