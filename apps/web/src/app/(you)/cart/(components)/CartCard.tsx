import Link from "next/link";
import { Plus, Minus } from "lucide-react";

import { LikeTextButton } from "@/components/LikeButton/LikeTextButton";
import { CrossIcon } from "@/components/Icons/CustomIcons";

import "./CartCard.css";
import { LoomImage } from "@/components/LoomImage";
import { CartItemWithItemCard } from "@/app/(you)/cart/(utils)/cart-utils";
import {
  useRemoveFromCart,
  useUpdateCartItemQuantity,
} from "@/app/(you)/cart/(utils)/use-cart";

export function CartCard({ product }: { product: CartItemWithItemCard }) {
  const removeFromCart = useRemoveFromCart();
  const updateQuantity = useUpdateCartItemQuantity();

  return (
    <>
      <div className="cart-card-wrapper">
        <LoomImage
          className="cart-card-img"
          src={product.itemCard.image}
          sizes="120px"
          alt=""
        />
        <div className="cart-card-content">
          <div className="cart-card-content-info">
            <Link
              href={`/item/${product.itemCard.id}`}
              className="cart-card-title"
            >
              {product.itemCard.name}
            </Link>
            <Link
              href={`/brands/${product.itemCard.brand}`}
              className="cart-card-brand"
            >
              {product.itemCard.brand}
            </Link>
            <p className="cart-card-price">
              {product.itemCard.price * product.localCartItem.quantity}
            </p>
            <div className="cart-card-variants text-xs text-gray-500">
              <div className="cart-card-quantity">
                <button
                  className="quantity-button"
                  onClick={() =>
                    updateQuantity(
                      product.localCartItem.id,
                      product.localCartItem.quantity - 1,
                    )
                  }
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="text-sm font-medium">
                  {product.localCartItem.quantity}
                </span>
                <button
                  className="quantity-button"
                  onClick={() =>
                    updateQuantity(
                      product.localCartItem.id,
                      product.localCartItem.quantity + 1,
                    )
                  }
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
              <p className="cart-card-size">
                Size: {product.localCartItem.size?.name}
              </p>
              <p className="cart-card-color capitalize">
                Color: {product.localCartItem.color?.name}
              </p>
            </div>
          </div>
          {/* <div className="cart-card-content-buttons">
            <LikeTextButton id={product.itemCard.id} />
          </div> */}
        </div>
        <button
          className="cart-card-remove-button"
          onClick={() => {
            removeFromCart(product.localCartItem.id);
          }}
        >
          <CrossIcon width="13" />
        </button>
      </div>
    </>
  );
}
