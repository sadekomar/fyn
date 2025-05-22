import { Flex } from "@radix-ui/themes";
import { BuyNowLink } from "./BuyNowLink";
import { AddToCart } from "@/app/(you)/cart/AddToCart";
import { Accordion } from "@/components/Accordion/Accordion";
import Link from "next/link";
import { LikeButton } from "@/components/ItemCard/LikeButton";
import { ShareButton } from "@/components/ShareButton";
import { CompareButton } from "@/components/CompareButton";
import { SizesPicker } from "./SizesPicker";
import { ItemPageI } from "@/lib/types";

export function ItemData({ data }: { data: ItemPageI }) {
  return (
    <div className="ItemData">
      <div className="item-data__wrapper">
        <h2 className="item-data__title">{data.name}</h2>
        <p className="item-data__brand">
          By{" "}
          <Link className="brand-link" href={`/brands/${data.brand}`}>
            {data.brand}
          </Link>
        </p>
        <p className="item-data__price">LE {data.price.toLocaleString()}.00</p>
      </div>

      <Flex direction={"column"} gap={"4"}>
        <Flex direction={"row"} gap={"2"}>
          <LikeButton id={data.id} className={"ItemPage_Button"} />
          <ShareButton
            id={data.id}
            name={data.name}
            description={data.description}
            className={"ItemPage_Button"}
          />
          <CompareButton id={data.id} className={"ItemPage_Button"} />
        </Flex>

        <SizesPicker data={data} />

        <div className="action-buttons-wrapper">
          <AddToCart id={data.id} />
          <BuyNowLink data={data} />
        </div>

        {data.description && data.description.length > 0 && (
          <Accordion trigger={"Description"}>{data.description}</Accordion>
        )}

        <div>
          <div className="sizes-title">Colors</div>
          <div className="color-circles-wrapper">
            {data.colors.map((color, index) => (
              <div
                className="color-circle"
                style={{ backgroundColor: color }}
                key={index}
              ></div>
            ))}
          </div>
        </div>

        <div>
          <div className="sizes-title">Material</div>
          <div className="item-info">{data.material}</div>
        </div>
        <div>
          <div className="sizes-title">Gender</div>
          <div className="item-info">{data.gender}</div>
        </div>
      </Flex>
    </div>
  );
}
