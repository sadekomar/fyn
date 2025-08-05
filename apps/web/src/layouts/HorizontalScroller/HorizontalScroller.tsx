import { ItemCardPlaceholder } from "@/components/ItemCard/ItemCardPlaceholder";
import { ItemCard } from "../../components/ItemCard/ItemCard";
import { ItemCardsI } from "@/lib/types";

import "./HorizontalScroll.css";
import { ReactElement } from "react";
import { OnSaleCard } from "@/app/item/[id]/item";

export function HorizontalScroller({
  items,
  children,
  theme,
}: {
  items: ItemCardsI[] | OnSaleCard[];
  children?: ReactElement<any>;
  theme?: "dark" | "light";
}) {
  return (
    <div
      className={`horizontalScroller pb-2 ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      {items
        ? items.map((item, index) => (
            <ItemCard
              key={index}
              id={item["id"]}
              name={item["name"]}
              price={item["price"]}
              brand={item.brand}
              image={item["image"]}
              imgLoading="eager"
              isSoldOut={item.isSoldOut}
              theme={theme}
              highestPrice={
                "highestPrice" in item ? item.highestPrice : undefined
              }
            />
          ))
        : [...Array(20)].map((_, index) => <ItemCardPlaceholder key={index} />)}
      {children}
    </div>
  );
}
