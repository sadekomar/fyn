import { Filters } from "../FiltersAndSort/Filters";
import "./FiltersAndCount.css";
import { MetadataI } from "@/types";

export function FiltersAndCount({ metadata }: { metadata: MetadataI }) {
  return (
    <>
      <Filters metadata={metadata} />
      <p className="item-count">
        {metadata?.count} {metadata?.count === 1 ? "Item" : "Items"}
      </p>
    </>
  );
}
