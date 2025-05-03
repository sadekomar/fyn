import "./GridLayout.css";

import { ItemCard } from "../../components/ItemCard/ItemCard";
import { GridPlaceholder } from "./GridPlaceholder";
import { ItemCardsI } from "@/types";

export function GridLayout({ items }: { items: ItemCardsI[] }) {
  return (
    <>
      {items && items.length != 0 ? (
        <div className="wrapper">
          <div className="grid">
            {items.map((item, index) => (
              <ItemCard
                key={index}
                id={item["id"]}
                name={item["name"]}
                price={item["price"]}
                brand={item["brand"]}
                image={item["image"]}
              />
            ))}
          </div>
        </div>
      ) : (
        <GridPlaceholder />
      )}
    </>
  );
}
