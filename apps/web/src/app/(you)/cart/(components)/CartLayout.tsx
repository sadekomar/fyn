import { CartCard } from "./CartCard";
import Link from "next/link";
import { EmptyState } from "../../../../components/EmptyState/EmptyState";
import { CartItemWithItemCard } from "@/app/(you)/cart/(utils)/cart-utils";

export function CartLayout({
  products,
  isEmpty,
}: {
  products: CartItemWithItemCard[];
  isEmpty: boolean;
}) {
  return (
    <>
      <div className="cart-cards-wrapper">
        {products?.length != 0 || !isEmpty ? (
          products?.map((product, index) => (
            <CartCard key={index} product={product} />
          ))
        ) : (
          <EmptyState title="Your cart is empty">
            <p>
              Check your{" "}
              <Link className="inline-link" href={"/liked-items"}>
                likes
              </Link>{" "}
              or{" "}
              <Link className="inline-link" href={"/all-categories"}>
                continue shopping
              </Link>
              .
            </p>
          </EmptyState>
        )}
      </div>
    </>
  );
}
