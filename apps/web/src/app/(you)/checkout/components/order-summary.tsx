import { UnivyrImage } from "@/components/clyo-image";
import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ItemCart, ShippingEstimate } from "../../cart/(utils)/cart-utils";
import { Loader2 } from "lucide-react";

export function OrderSummary({
  cartItems,
  shippingEstimates,
  subtotal,
  total,
  formSubmitting,
}: {
  cartItems: ItemCart[];
  shippingEstimates: ShippingEstimate[];
  subtotal: number;
  total: number;
  formSubmitting: boolean;
}) {
  return (
    <>
      <div className="space-y-6">
        <Card className="sticky top-8">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="relative">
                    <UnivyrImage
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
                      {item.color?.name} • {item.size.name}
                    </p>
                    <div className="cart-card-quantity">
                      <span className="text-sm font-medium text-gray-500">
                        Quantity: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    LE {(item.price * item.quantity).toLocaleString()}
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

            <Button
              type="submit"
              className="mt-6 w-full"
              size="lg"
              disabled={formSubmitting}
            >
              {formSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>Place Order • LE {total.toFixed(2)}</>
              )}
            </Button>

            <p className="mt-2 text-center text-xs text-gray-500">
              By placing your order, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
