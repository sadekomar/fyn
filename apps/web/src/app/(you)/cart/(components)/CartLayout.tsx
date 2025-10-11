import { CartCard } from "./CartCard";
import Link from "next/link";
import { EmptyState } from "../../../../components/EmptyState/EmptyState";
import { ItemCart } from "@/app/(you)/cart/(utils)/cart-utils";

export function CartLayout({ products }: { products: ItemCart[] }) {
  const isEmpty = products.length === 0;
  return (
    <>
      <div className="cart-cards-wrapper">
        {products?.length > 0 ? (
          products?.map((product, index) => (
            <CartCard key={index} product={product} />
          ))
        ) : isEmpty ? (
          <EmptyState title="Your cart is empty">
            <p>
              Check your{" "}
              <Link className="inline-link underline" href={"/likes"}>
                likes
              </Link>{" "}
              or{" "}
              <Link className="inline-link underline" href={"/shop"}>
                continue shopping
              </Link>
              .
            </p>
          </EmptyState>
        ) : null}
      </div>
    </>
  );
}
