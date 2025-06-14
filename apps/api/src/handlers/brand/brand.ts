import { Brand } from "@prisma/client";
import { readBrands, readBrandsByLetter } from "./read-brands";
import { createBrand } from "./create-brand";
import { deleteBrand } from "./delete-brand";
import { updateBrand } from "./update-brand";
import { readBrand } from "./read-brand";

export {
  readBrands,
  readBrandsByLetter,
  createBrand,
  deleteBrand,
  updateBrand,
  readBrand,
};

// Create
export type CreateBrandRequest = {
  name: string;
  description?: string;
  image?: string;
  logo?: string;
};

type CreateBrandSuccessResponse = {
  status: "success";
  message: string;
  data: Brand;
};

type CreateBrandErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type CreateBrandResponse =
  | CreateBrandSuccessResponse
  | CreateBrandErrorResponse;

// Read
export type ReadBrandsResponse = {
  name: string;
  id: string;
  description: string | null;
  image: string | null;
  logo: string | null;
}[];

export type ReadBrandsByLetterResponse = Record<
  string,
  {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
    logo: string | null;
  }[]
>;

// Update
export type UpdateBrandRequest = {
  name?: string;
  description?: string;
  image?: string;
  logo?: string;
};

type UpdateBrandSuccessResponse = {
  status: "success";
  message: string;
  data: Brand;
};

type UpdateBrandErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type UpdateBrandResponse =
  | UpdateBrandSuccessResponse
  | UpdateBrandErrorResponse;

// Delete
type DeleteBrandSuccessResponse = {
  status: "success";
  message: string;
  data: Brand;
};

type DeleteBrandErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type DeleteBrandResponse =
  | DeleteBrandSuccessResponse
  | DeleteBrandErrorResponse;
