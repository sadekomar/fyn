import { ItemCardPlaceholder } from "@/components/ItemCard/ItemCardPlaceholder";
import "./GridLayout.css";

export function GridPlaceholder() {
  return (
    <>
      <div className="wrapper">
        <div className="loom-grid">
          {[...Array(100)].map((_, index) => (
            <ItemCardPlaceholder key={index} />
          ))}
        </div>
      </div>
    </>
  );
}
