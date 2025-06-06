import { Category } from "@prisma/client";

// Create
export type CreateCategoryRequest = {
  name: string;
};

type CreateCategorySuccessResponse = {
  status: "success";
  message: string;
  data: Category;
};

type CreateCategoryErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type CreateCategoryResponse =
  | CreateCategorySuccessResponse
  | CreateCategoryErrorResponse;

// Read
export type ReadCategoriesResponse = Category[];

// Update
export type UpdateCategoryRequest = {
  name: string;
};

type UpdateCategorySuccessResponse = {
  status: "success";
  message: string;
  data: Category;
};

type UpdateCategoryErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type UpdateCategoryResponse =
  | UpdateCategorySuccessResponse
  | UpdateCategoryErrorResponse;

// Delete
type DeleteCategorySuccessResponse = {
  status: "success";
  message: string;
  data: Category;
};

type DeletCategoryErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type DeleteCategoryResponse =
  | DeleteCategorySuccessResponse
  | DeletCategoryErrorResponse;
