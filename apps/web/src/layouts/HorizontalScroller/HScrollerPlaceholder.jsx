import { HorizontalScroller } from "./HorizontalScroller";
import { ItemCardPlaceholder } from "@/components/ItemCard/ItemCardPlaceholder";

export function HScrollerPlaceholder() {
  return (
    <>
      <div className="h-scroller-title">
        <span className="scroller-title-placeholder"></span>
      </div>
      <div className="horizontalScroller">
        {[...Array(20)].map((_, index) => (
          <ItemCardPlaceholder key={index} />
        ))}
      </div>
    </>
  );
}
