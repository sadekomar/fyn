"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Package, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { LoomImage } from "@/components/LoomImage";
import { useGetCartItems } from "@/app/(you)/cart/(utils)/use-cart";
import {
  getTotalPrice,
  getShippingEstimates,
} from "@/app/(you)/cart/(utils)/cart-utils";

export default function OrderConfirmedPage() {
  const { data: cartItems = [] } = useGetCartItems();
  const subtotal = getTotalPrice(cartItems);
  const shippingEstimates = getShippingEstimates(cartItems);
  const total =
    subtotal +
    shippingEstimates.reduce((acc, estimate) => acc + estimate.cost, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
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
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.localCartItem.id}
                    className="flex items-center space-x-4"
                  >
                    <div className="relative">
                      <LoomImage
                        src={item.itemCard.image}
                        alt={item.itemCard.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.localCartItem.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.itemCard.name}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {item.localCartItem.color?.name} •{" "}
                        {item.localCartItem.size?.name}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      LE{" "}
                      {(
                        item.itemCard.price * item.localCartItem.quantity
                      ).toFixed(2)}
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
                    <span>Shipping - {estimate.brand}</span>
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
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
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
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
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
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/orders" className="flex-1">
              <Button className="w-full">
                View Order Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
