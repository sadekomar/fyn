"use client";

import { useParams } from "next/navigation";
import { getOrderByNumber } from "@/api/orders";
import { ReadOrderResponse } from "@/api/types/order-types";
import { UnivyrImage } from "@/components/univyr-image";
import { useQuery } from "@tanstack/react-query";

export default function OrderNumberPage() {
  const { orderNumber } = useParams<{ orderNumber: string }>();

  const {
    data: order,
    isLoading,
    error,
  } = useQuery<ReadOrderResponse | null>({
    queryKey: ["order", orderNumber],
    queryFn: async () => {
      const response = await getOrderByNumber(orderNumber);
      if (!response) throw new Error("Order not found");
      return response;
    },
    enabled: !!orderNumber,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Order #{order.orderNumber}</h1>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Order Details</h2>
            <div className="mt-2 space-y-2">
              <p>
                Status:{" "}
                <span className="capitalize">{order.status.toLowerCase()}</span>
              </p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: {order.orderTotal}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Contact Information</h2>
            <div className="mt-2 space-y-2">
              <p>Email: {order.email}</p>
              <p>Phone: {order.phoneNumber}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Items</h2>
          <div className="mt-4 space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <div className="h-24 w-24 flex-shrink-0">
                  <UnivyrImage
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    Size: {item.size.name}
                    {item.color && ` • Color: ${item.color.name}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  <p className="mt-1 font-medium">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
