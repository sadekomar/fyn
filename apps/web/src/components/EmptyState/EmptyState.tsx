import "./EmptyState.css";

export function EmptyState({ title, children }) {
  return (
    <div className="empty-state-wrapper">
      <h3 className="empty-cart-title">{title}</h3>
      {children}
    </div>
  );
}
