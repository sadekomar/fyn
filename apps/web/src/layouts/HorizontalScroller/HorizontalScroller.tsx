import { ItemCardPlaceholder } from "@/components/ItemCard/ItemCardPlaceholder";
import { ItemCard } from "../../components/ItemCard/ItemCard";
import { ItemCardsI } from "@/types";

import "./HorizontalScroll.css";
import { ReactElement } from "react";

export function HorizontalScroller({
  items,
  children,
}: {
  items: ItemCardsI[];
  children?: ReactElement<any>;
}) {
  return (
    <div className="horizontalScroller">
      {items
        ? items.map((item, index) => (
            <ItemCard
              key={index}
              id={item["id"]}
              name={item["name"]}
              price={item["price"]}
              brand={item["brand"]}
              image={item["image"]}
            />
          ))
        : [...Array(20)].map((_, index) => <ItemCardPlaceholder key={index} />)}
      {children}
    </div>
  );
}
