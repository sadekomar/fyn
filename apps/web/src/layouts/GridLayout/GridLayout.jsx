import "./GridLayout.css";

import { ItemCard } from "../../components/ItemCard/ItemCard";
import { GridPlaceholder } from "./GridPlaceholder";

export function GridLayout({ products, emptyState }) {
  return (
    <>
      {products && products.length != 0 ? (
        <div className="wrapper">
          <div className="grid">
            {products.map((product, index) => (
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
                gender={product["gender"]}
                material={product["material"]}
                category={product["category"]}
                color={product["color"]}
                colors={product["colors"]}
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
