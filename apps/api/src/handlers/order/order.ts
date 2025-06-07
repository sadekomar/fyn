import { createOrder } from "./create-order";
import { readOrder } from "./read-order";
import { readOrders } from "./read-orders";
import { updateOrder } from "./update-order";
import { deleteOrder } from "./delete-order";

export { createOrder, readOrder, readOrders, updateOrder, deleteOrder };

// Create
type CreateOrderSuccessResponse = {
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
enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export type Order = {
  id: string;
  userId: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
};

// Update
type UpdateOrderRequest = {
  status: OrderStatus;
};

type UpdateOrderSuccessResponse = {
  status: "success";
  message: string;
  data: {
    orderId: string;
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
