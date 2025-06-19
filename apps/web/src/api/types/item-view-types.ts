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
