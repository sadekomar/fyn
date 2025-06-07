import { createCartItem } from "./create-cart";
import { readCartItems } from "./read-cart";
import { updateCartItem } from "./update-cart";
import { deleteCartItem } from "./delete-cart";

export { createCartItem, readCartItems, updateCartItem, deleteCartItem };

// Create
export type CreateCartRequest = {
  itemId: string;
  sizeId: string;
  colorId: string;
  quantity: number;
  userId: string;
};

type CreateCartSuccessResponse = {
  status: "success";
  message: string;
  data: {
    id: string;
    quantity: number;
  };
};

type CreateCartErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type CreateCartResponse =
  | CreateCartSuccessResponse
  | CreateCartErrorResponse;

// Read
export type CartItem = {
  id: string;
  itemId: string;
  quantity: number;
  size: {
    id: string;
    name: string;
  };
  color: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
};

// Update
export type UpdateCartRequest = {
  quantity: number;
};

type UpdateCartSuccessResponse = {
  status: "success";
  message: string;
  data: {
    id: string;
    quantity: number;
  };
};

type UpdateCartErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type UpdateCartResponse =
  | UpdateCartSuccessResponse
  | UpdateCartErrorResponse;

// Delete
type DeleteCartSuccessResponse = {
  status: "success";
  message: string;
  data: {
    id: string;
  };
};

type DeleteCartErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type DeleteCartResponse =
  | DeleteCartSuccessResponse
  | DeleteCartErrorResponse;
