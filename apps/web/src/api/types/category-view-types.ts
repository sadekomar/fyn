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
  userId: string;
};

export type ReadCategoryViewResponse = {
  id: string;
  name: string;
};
