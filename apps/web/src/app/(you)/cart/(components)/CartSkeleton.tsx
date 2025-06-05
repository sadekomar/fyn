import "./CartSkeleton.css";

export function CartSkeleton() {
  return (
    <div className="cart-card-wrapper skeleton">
      <div className="cart-card-img skeleton-image" />
      <div className="cart-card-content">
        <div className="cart-card-content-info">
          <div className="skeleton-title" />
          <div className="skeleton-brand" />
          <div className="skeleton-price" />
          <div className="cart-card-variants">
            <div className="skeleton-quantity" />
            <div className="skeleton-size" />
            <div className="skeleton-color" />
          </div>
        </div>
      </div>
    </div>
  );
}
