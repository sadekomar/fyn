"use client";

import { getOrdersByUserId, putOrder } from "@/api/orders";
import { ReadAllOrdersResponse } from "@/api/types/order-types";
import { getUserSession } from "@/lib/auth";
import { ClyoImage } from "@/components/clyo-image";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderStatus } from "@/api/types/base-types";
import { AlertDialog, Button } from "@radix-ui/themes";
import { useState } from "react";

function OrderSkeleton() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 animate-pulse rounded-md bg-gray-200"></div>
      </div>

      <div className="space-y-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
          >
            <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="h-6 w-32 animate-pulse rounded-md bg-gray-200"></div>
                  <div className="mt-2 h-4 w-48 animate-pulse rounded-md bg-gray-200"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200"></div>
                  <div className="h-6 w-16 animate-pulse rounded-md bg-gray-200"></div>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Order Items Skeleton */}
              <div className="mb-6">
                <div className="mb-4 h-5 w-24 animate-pulse rounded-md bg-gray-200"></div>
                <div className="space-y-4">
                  {[1, 2].map((item) => (
                    <div key={item} className="flex items-start gap-4">
                      <div className="h-20 w-20 animate-pulse rounded-md bg-gray-200"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-3/4 animate-pulse rounded-md bg-gray-200"></div>
                        <div className="h-4 w-1/2 animate-pulse rounded-md bg-gray-200"></div>
                        <div className="h-4 w-1/3 animate-pulse rounded-md bg-gray-200"></div>
                        <div className="h-4 w-1/4 animate-pulse rounded-md bg-gray-200"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metadata Skeleton */}
              <div className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 sm:grid-cols-3">
                {[1, 2, 3].map((section) => (
                  <div key={section} className="space-y-2">
                    <div className="h-5 w-24 animate-pulse rounded-md bg-gray-200"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-3/4 animate-pulse rounded-md bg-gray-200"></div>
                      <div className="h-4 w-1/2 animate-pulse rounded-md bg-gray-200"></div>
                      <div className="h-4 w-2/3 animate-pulse rounded-md bg-gray-200"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const queryClient = useQueryClient();
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);

  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const session = await getUserSession();
      if (!session?.userId) {
        throw new Error("Please log in to view your orders");
      }
      return getOrdersByUserId(session.userId);
    },
  });

  const cancelOrderMutation = useMutation({
    mutationFn: async (orderId: string) =>
      await putOrder(orderId, { status: OrderStatus.CANCELLED }),
    onSuccess: (_, orderId) => {
      queryClient.setQueryData<ReadAllOrdersResponse[]>(["orders"], (old) =>
        old?.map((order) =>
          order.id === orderId
            ? { ...order, status: OrderStatus.CANCELLED }
            : order,
        ),
      );
      setOrderToCancel(null);
    },
  });

  const handleCancelOrder = async (orderId: string) => {
    try {
      await cancelOrderMutation.mutateAsync(orderId);
    } catch (err) {
      // Error is handled by the mutation
    }
  };

  if (isLoading) {
    return <OrderSkeleton />;
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-8 text-center">
        <div className="text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto mb-4"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h3 className="mb-2 text-lg font-semibold">Unable to load orders</h3>
          <p className="text-sm text-red-500">
            {error instanceof Error ? error.message : "Failed to load orders"}
          </p>
        </div>
        <button
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["orders"] })
          }
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto mb-4 text-gray-400"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900">No orders yet</h3>
        <p className="text-sm text-gray-500">
          When you place an order, it will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Orders</h1>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Order #{order.orderNumber}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Placed on {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Status:</span>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                        order.status === OrderStatus.CANCELLED
                          ? "bg-red-100 text-red-700"
                          : order.status === OrderStatus.DELIVERED
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  {order.status === OrderStatus.PENDING && (
                    <>
                      <div className="h-4 w-px bg-gray-200"></div>
                      <AlertDialog.Root>
                        <AlertDialog.Trigger>
                          <button
                            onClick={() => setOrderToCancel(order.id)}
                            className="rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                          >
                            Cancel
                          </button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content className="max-w-md">
                          <AlertDialog.Title>Cancel Order</AlertDialog.Title>
                          <AlertDialog.Description>
                            Are you sure you want to cancel order #
                            {order.orderNumber}? This action cannot be undone.
                          </AlertDialog.Description>
                          <div className="mt-6 flex flex-col justify-end gap-3 md:flex-row">
                            <AlertDialog.Cancel>
                              <Button variant="soft" color="gray">
                                Keep Order
                              </Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action>
                              <Button
                                variant="solid"
                                color="red"
                                onClick={() => handleCancelOrder(order.id)}
                              >
                                Yes, Cancel Order
                              </Button>
                            </AlertDialog.Action>
                          </div>
                        </AlertDialog.Content>
                      </AlertDialog.Root>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Order Items - Now at the top */}
              <div className="mb-6">
                <h4 className="mb-4 text-sm font-medium text-gray-900">
                  Order Items
                </h4>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <Link
                      href={`/item/${item.itemId}`}
                      key={item.id}
                      className="flex items-start gap-4"
                    >
                      <ClyoImage
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="text-sm font-medium text-gray-900">
                          {item.name}
                        </h5>
                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-500">
                          Size: {item.size.name}
                          {item.color && ` • Color: ${item.color.name}`}
                        </p>
                        <p className="text-sm text-gray-500">
                          Price: LE {item.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Shipping: LE{" "}
                          {item.shippingEstimate.cost.toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Condensed Metadata Section */}
              <div className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">
                    Contact Info
                  </h4>
                  <div className="text-sm text-gray-500">
                    <p>{order.email}</p>
                    <p>{order.phoneNumber}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">
                    Order Details
                  </h4>
                  <div className="text-sm text-gray-500">
                    <p>Total: LE {order.orderTotal.toLocaleString()}</p>
                    <p>
                      Last Updated: {new Date(order.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">
                    Shipping Address
                  </h4>
                  <div className="text-sm text-gray-500">
                    <p>
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p>{order.address.address}</p>
                    {order.address.apartment && (
                      <p>Apt {order.address.apartment}</p>
                    )}
                    <p>
                      {order.address.city}, {order.address.governorate}
                    </p>
                    <p>
                      {order.address.country}
                      {order.address.postalCode &&
                        `, ${order.address.postalCode}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
