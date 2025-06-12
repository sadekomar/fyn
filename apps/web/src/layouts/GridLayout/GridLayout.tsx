import "./GridLayout.css";

import { ItemCard } from "../../components/ItemCard/ItemCard";
import { GridPlaceholder } from "./GridPlaceholder";
import { ItemCardsI } from "@/lib/types";

export function GridLayout({ items }: { items: ItemCardsI[] | undefined }) {
  return (
    <>
      {items && items.length != 0 ? (
        <div className="wrapper">
          <div className="loom-grid">
            {items.map((item, index) => (
              <ItemCard
                key={index}
                id={item.id}
                name={item.name}
                price={item.price}
                brand={item.brand}
                image={item.image}
                isSoldOut={item.isSoldOut}
              />
            ))}
          </div>
        </div>
      ) : items?.length === 0 ? (
        <div className="no-results-found my-6 flex flex-col items-center justify-center rounded-lg border border-gray-200 p-8 text-xl font-medium text-gray-600 shadow-sm">
          <p className="mb-2">No results found</p>
          <p className="text-sm text-gray-500">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
        </div>
      ) : (
        <GridPlaceholder />
      )}
    </>
  );
}
