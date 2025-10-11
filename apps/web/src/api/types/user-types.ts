import { User } from "./base-types";

// Create
export type CreateUserRequest = {
  email: string;
  password: string;
  phoneNumber: string;
  username?: string;
  firstName?: string;
  lastName?: string;
};

type CreateUserSuccessResponse = {
  status: "success";
  message: string;
  data: User;
};

type CreateUserErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type CreateUserResponse =
  | CreateUserSuccessResponse
  | CreateUserErrorResponse;

// Read
export type ReadUserFullResponse = {
  id: string;
  email: string;
  password: string;
  username: string;
  isEmailConfirmed: boolean;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string;
  confirmationToken: string | null;
  tokenExpiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  itemViews: {
    id: string;
    itemId: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
  categoryViews: {
    id: string;
    categoryId: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
  brandViews: {
    id: string;
    brandId: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
  likes: {
    id: string;
    itemId: string;
    createdAt: Date;
  }[];
  itemCarts: {
    id: string;
    itemId: string;
    quantity: number;
    sizeId: string;
    colorId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
  orders: {
    id: string;
    orderNumber: string;
    orderTotal: number;
    status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    email: string;
    phoneNumber: string;
    addressId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  addresses: {
    id: string;
    firstName: string;
    lastName: string;
    company: string | null;
    address: string;
    apartment: string | null;
    city: string;
    governorate: string;
    country: string;
    postalCode: string | null;
    addressType: "NORMAL" | "BILLING";
    createdAt: Date;
  }[];
};

export type ReadUserCheckoutResponse = {
  id: string;
  email: string;
  password: string;
  username: string;
  isEmailConfirmed: boolean;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string;
  confirmationToken: string | null;
  tokenExpiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  customMessage: string | null;
  isPasswordReset: boolean;
  addresses: {
    id: string;
    firstName: string;
    lastName: string;
    company: string | null;
    address: string;
    apartment: string | null;
    city: string;
    governorate: string;
    country: string;
    postalCode: string | null;
    addressType: "NORMAL" | "BILLING";
    createdAt: Date;
  }[];
};

// Update
export type UpdateUserRequest = {
  email?: string;
  password?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
};

type UpdateUserSuccessResponse = {
  status: "success";
  message: string;
  data: User;
};

type UpdateUserErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type UpdateUserResponse =
  | UpdateUserSuccessResponse
  | UpdateUserErrorResponse;

// Delete
type DeleteUserSuccessResponse = {
  status: "success";
  message: string;
  data: User;
};

type DeleteUserErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type DeleteUserResponse =
  | DeleteUserSuccessResponse
  | DeleteUserErrorResponse;
