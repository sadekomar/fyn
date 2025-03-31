import { Filters } from "../FiltersAndSort/Filters";

import "./FiltersAndCount.css";

export function FiltersAndCount({ metadata }) {
  return (
    <>
      <Filters metadata={metadata} />
      <p className="item-count">
        {metadata.item_count} {metadata.item_count === 1 ? "Item" : "Items"}
      </p>
    </>
  );
}
