import { createCartItem } from "./create-cart";
import { readCartItems } from "./read-cart";
import { updateCartItem } from "./update-cart";
import { deleteCartItem } from "./delete-cart";

export { createCartItem, readCartItems, updateCartItem, deleteCartItem };

// Create
type CreateCartItemBase = {
  itemId: string;
  sizeId: string;
  quantity: number;
  colorId?: string | null | undefined;
};

type CreateCartItemUser = CreateCartItemBase & {
  type: "user";
  userId: string;
};

type CreateCartItemGuest = CreateCartItemBase & {
  type: "guest";
  guestUserId: string;
};

export type CreateCartRequest = CreateCartItemUser | CreateCartItemGuest;

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
export type ItemCart = {
  id: string;
  quantity: number;
  size: {
    id: string;
    name: string;
  };
  color: {
    id: string;
    name: string;
  } | null;
  // item card data
  itemId: string;
  name: string;
  price: number;
  brand: {
    id: string;
    name: string;
  };
  image: string;
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
