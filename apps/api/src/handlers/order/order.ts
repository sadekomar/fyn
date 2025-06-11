import { createOrder } from "./create-order";
import { readOrder } from "./read-order";
import { readOrders } from "./read-orders";
import { updateOrder } from "./update-order";
import { deleteOrder } from "./delete-order";
import {
  Address,
  Brand,
  Color,
  ItemOrder,
  OrderStatus,
  ShippingEstimate,
  Size,
} from "@prisma/client";

export { createOrder, readOrder, readOrders, updateOrder, deleteOrder };

// Create
// user was created
// address was created

// but wait if a new order is created and a new user all at the same time yess yess it'll send the user id from the frontend with it actually so yeah this is nice.

type BaseCreateOrderRequest = {
  userId: string;
  email: string;
  phoneNumber: string;
  shippingEstimates: {
    cost: number;
    brand: string;
  }[];
  itemOrders: {
    itemId: string;
    quantity: number;
    name: string;
    image: string;
    price: number;
    sizeId: string;
    colorId: string | null;
  }[];
};

type CreateOrderRequestSavedAddress = BaseCreateOrderRequest & {
  isSavedAddress: true;
  addressId: string;
};

type CreateOrderRequestNewAddress = BaseCreateOrderRequest & {
  isSavedAddress: false;
  address: {
    firstName: string;
    lastName: string;
    address: string;
    apartment: string | null;
    city: string;
    governorate: string;
    postalCode: string | null;
  };
};

export type CreateOrderRequest =
  | CreateOrderRequestSavedAddress
  | CreateOrderRequestNewAddress;

export type CreateOrderSuccessResponse = {
  status: "success";
  message: string;
  data: {
    orderId: string;
  };
};

type CreateOrderErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type CreateOrderResponse =
  | CreateOrderSuccessResponse
  | CreateOrderErrorResponse;

// Read
export type ReadOrderResponse = {
  id: string;
  orderNumber: string;
  orderTotal: number;
  status: OrderStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  phoneNumber: string;
  addressId: string;
  items: {
    name: string;
    id: string;
    orderId: string;
    itemId: string;
    quantity: number;
    image: string;
    price: number;
    size: Size;
    color: Color | null;
    shippingEstimate: {
      id: string;
      brand: Brand;
      cost: number;
    };
  }[];
};

export type ReadAllOrdersResponse = {
  id: string;
  orderNumber: string;
  orderTotal: number;
  status: OrderStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  phoneNumber: string;
  addressId: string;
  address: Address;
  items: {
    name: string;
    id: string;
    orderId: string;
    itemId: string;
    quantity: number;
    image: string;
    price: number;
    size: Size;
    color: Color | null;
    shippingEstimate: ShippingEstimate;
  }[];
};

// Update
export type UpdateOrderRequest = {
  status: OrderStatus;
};

type UpdateOrderSuccessResponse = {
  status: "success";
  message: string;
  data: {
    orderId: string;
    status: OrderStatus;
  };
};

type UpdateOrderErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type UpdateOrderResponse =
  | UpdateOrderSuccessResponse
  | UpdateOrderErrorResponse;

// Delete
type DeleteOrderSuccessResponse = {
  status: "success";
  message: string;
  data: {
    orderId: string;
  };
};

type DeleteOrderErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type DeleteOrderResponse =
  | DeleteOrderSuccessResponse
  | DeleteOrderErrorResponse;
