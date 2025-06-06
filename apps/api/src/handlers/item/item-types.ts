import { Item } from "@prisma/client";

//misc
export enum Genders {
  UNISEX = "Unisex",
  MALE = "Male",
  FEMALE = "Female",
}

export enum ImageSizes {
  PATTERN = "loom-image-dimensions",
  LARGE = "1080",
  MEDIUM = "600",
  SMALL = "460",
  THUMBNAIL = "300",
}

export type ItemCardsI = {
  id: string;
  name: string;
  price: number;
  brand: string;
  image: string;
};

export type ItemPageI = {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  images: string[];
  categories: string[];
  colors: { id: string; name: string }[];
  gender: string;
  material: string;
  link: string;
  sizes: {
    id: string;
    name: string;
    available: boolean;
  }[];
};

export type MetadataI = {
  items: {
    name: string;
    count: number;
  };
  genders: {
    name: string;
    count: number;
  }[];
  categories: {
    name: string;
    count: number;
  }[];
  colors: {
    name: string;
    count: number;
  }[];
  brands: {
    name: string;
    count: number;
  }[];
  materials: {
    name: string;
    count: number;
  }[];
};

export type SearchParamsI = {
  search?: string;
  brands?: string[];
  gender?: string;
  categories?: string[];
  colors?: string[];
  materials?: string[];
  showrooms?: string[];
  in_stock?: boolean;
};

export type CategoriesI = {
  name: string;
  count: number;
  image: string;
};

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
