import { Filters } from "../FiltersAndSort/Filters";
import "./FiltersAndCount.css";
import { MetadataI } from "@/types";

export function FiltersAndCount({
  metadata,
}: {
  metadata: MetadataI | undefined;
}) {
  return (
    <>
      <Filters metadata={metadata} />
      <p className="item-count">
        {metadata?.items.count} {metadata?.items.count === 1 ? "Item" : "Items"}
      </p>
    </>
  );
}
