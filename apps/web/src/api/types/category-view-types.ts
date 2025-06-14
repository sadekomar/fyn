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
