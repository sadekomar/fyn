"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Package, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { LoomImage } from "@/components/LoomImage";

import { useSearchParams } from "next/navigation";
import { getOrderById } from "@/api/orders";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function OrderConfirmedSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-gray-200"></div>
          <div className="mx-auto mb-2 h-8 w-64 animate-pulse rounded-md bg-gray-200"></div>
          <div className="mx-auto h-4 w-96 animate-pulse rounded-md bg-gray-200"></div>
        </div>

        <div className="grid gap-6">
          {/* Order Summary Skeleton */}
          <Card>
            <CardHeader>
              <div className="h-6 w-32 animate-pulse rounded-md bg-gray-200"></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="h-16 w-16 animate-pulse rounded-md bg-gray-200"></div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="h-4 w-3/4 animate-pulse rounded-md bg-gray-200"></div>
                      <div className="h-4 w-1/2 animate-pulse rounded-md bg-gray-200"></div>
                    </div>
                    <div className="h-4 w-20 animate-pulse rounded-md bg-gray-200"></div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-24 animate-pulse rounded-md bg-gray-200"></div>
                    <div className="h-4 w-20 animate-pulse rounded-md bg-gray-200"></div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                  <div className="h-6 w-16 animate-pulse rounded-md bg-gray-200"></div>
                  <div className="h-6 w-24 animate-pulse rounded-md bg-gray-200"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Status Skeleton */}
          <Card>
            <CardHeader>
              <div className="h-6 w-32 animate-pulse rounded-md bg-gray-200"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-32 animate-pulse rounded-md bg-gray-200"></div>
                      <div className="h-4 w-48 animate-pulse rounded-md bg-gray-200"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Buttons Skeleton */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="h-10 flex-1 animate-pulse rounded-md bg-gray-200"></div>
            <div className="h-10 flex-1 animate-pulse rounded-md bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmedPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const queryClient = useQueryClient();
  const { data: order, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      return await getOrderById(orderId!);
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  }, [queryClient]);

  if (isLoading) {
    return <OrderConfirmedSkeleton />;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  const subtotal = order.items.reduce(
    (acc: number, item) => acc + item.price * item.quantity,
    0,
  );
  const shippingEstimates = order.shippingEstimates;
  const total =
    subtotal +
    shippingEstimates.reduce((acc: number, estimate) => acc + estimate.cost, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Order confirmed
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. We'll send you an email with your order
            details.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative">
                      <LoomImage
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                      <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-xs text-white">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {item.color ? `Color: ${item.color.name}` : ""} •{" "}
                        {item.size ? `Size: ${item.size.name}` : ""}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      LE {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>LE {subtotal.toFixed(2)}</span>
                </div>
                {shippingEstimates.map((estimate, index) => (
                  <div
                    className="flex justify-between text-sm capitalize"
                    key={index}
                  >
                    <span>Shipping - {estimate.brand.name}</span>
                    <span>LE {estimate.cost}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>LE {total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>Order status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      <Package className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Order Placed
                    </h3>
                    <p className="text-sm text-gray-500">
                      Your order has been received
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                      <Truck className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Shipping
                    </h3>
                    <p className="text-sm text-gray-500">
                      We'll notify you when your order ships
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Continue shopping
              </Button>
            </Link>
            <Link href="/orders" className="flex-1">
              <Button className="w-full">
                View all orders
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
