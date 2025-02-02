import { ItemCardPlaceholder } from "@/components/ItemCard/ItemCardPlaceholder";
import { ItemCard } from "../../components/ItemCard/ItemCard";

import "./HorizontalScroll.css";

export function HorizontalScroller({ items, children }) {
  return (
    <div className="horizontalScroller">
      {items
        ? items.map((product, index) => (
            <ItemCard
              key={index}
              id={product["id"]}
              name={product["name"]}
              price={product["price"]}
              brand={product["brand"]}
              date={product["date"]}
              description={product["description"]}
              link={product["link"]}
              src={product["src"]}
              srcSet={product["srcset"]}
              sizes={product["sizes"]}
              colors={product["colors"]}
              imgLoading="lazy"
            />
          ))
        : [...Array(20)].map((_, index) => <ItemCardPlaceholder key={index} />)}
      {children}
    </div>
  );
}
