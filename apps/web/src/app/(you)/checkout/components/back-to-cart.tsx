import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function BackToCart() {
  return (
    <div className="mb-8">
      <Link href="/cart">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Button>
      </Link>
      <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
    </div>
  );
}
