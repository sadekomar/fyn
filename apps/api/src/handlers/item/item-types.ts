import { Item } from "@prisma/client";

// Create
export type CreateItemRequest = {
  name: string;
  description: string;
  latestPrice: number;
  link: string;
  brandId: string;
  materialId?: string;
  gender?: "MALE" | "FEMALE" | "UNISEX" | "KIDS";
  categories?: string[];
  colors?: string[];
  sizes?: string[];
  images?: string[];
};

type CreateItemSuccessResponse = {
  status: "success";
  message: string;
  data: Item;
};

type CreateItemErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type CreateItemResponse =
  | CreateItemSuccessResponse
  | CreateItemErrorResponse;

// Read
type ReadItemSuccessResponse = {
  status: "success";
  message: string;
  data: Item;
};

type ReadItemErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type ReadItemResponse = ReadItemSuccessResponse | ReadItemErrorResponse;

// Update
export type UpdateItemRequest = Partial<{
  name: string;
  description: string;
  latestPrice: number;
  link: string;
  brandId: string;
  materialId: string;
  gender: "MALE" | "FEMALE" | "UNISEX" | "KIDS";
  categories: string[];
  colors: string[];
  sizes: string[];
  images: string[];
}>;

type UpdateItemSuccessResponse = {
  status: "success";
  message: string;
  data: Item;
};

type UpdateItemErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type UpdateItemResponse =
  | UpdateItemSuccessResponse
  | UpdateItemErrorResponse;

// Delete
type DeleteItemSuccessResponse = {
  status: "success";
  message: string;
  data: Item;
};

type DeleteItemErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type DeleteItemResponse =
  | DeleteItemSuccessResponse
  | DeleteItemErrorResponse;
