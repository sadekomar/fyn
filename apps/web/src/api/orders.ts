import { clientHttp } from "@/lib/queries/http.service";
import { Endpoints } from "./endpoints";
import {
  CreateOrderRequest,
  CreateOrderResponse,
  DeleteOrderResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
  ReadOrderResponse,
  ReadAllOrdersResponse,
} from "./types/order-types";

export const postOrder = async (order: CreateOrderRequest) => {
  return clientHttp.post<CreateOrderRequest, CreateOrderResponse>(
    Endpoints.Order,
    order,
  );
};

export const getOrdersByUserId = async (userId: string) => {
  if (!userId) {
    return [];
  }

  return clientHttp.get<ReadAllOrdersResponse[]>(
    Endpoints.OrdersByUserId.replace(":userId", userId),
  );
};

export const getOrderById = async (id: string) => {
  if (!id) {
    return null;
  }

  return clientHttp.get<ReadOrderResponse>(
    Endpoints.OrderById.replace(":id", id),
  );
};

export const putOrder = async (id: string, order: UpdateOrderRequest) => {
  if (!id) {
    return null;
  }

  return clientHttp.put<UpdateOrderRequest, UpdateOrderResponse>(
    Endpoints.OrderById.replace(":id", id),
    order,
  );
};

export const deleteOrder = async (id: string) => {
  if (!id) {
    return null;
  }

  return clientHttp.delete<DeleteOrderResponse>(
    Endpoints.OrderById.replace(":id", id),
  );
};
