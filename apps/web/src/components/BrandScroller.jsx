import Link from "next/link";

import { IPAddress } from "../data/IPAddress";
import { FollowButton } from "./FollowButton/FollowButton";
import { HorizontalScroller } from "../layouts/HorizontalScroller/HorizontalScroller";

import "../layouts/HorizontalScroller/HorizontalScroll.css";

export async function BrandScroller({ brand, title }) {
  let response = await fetch(
    `${IPAddress}/search?brand=${brand}&limit=20&sort_by=date-descending`,
  );

  let data = await response.json();
  console.log(data);

  return (
    <>
      <div className="h-scroller-title">
        <h3>
          {title}
          <Link href={`/brands/${brand}`} className="brand-link">
            {brand}
          </Link>
        </h3>
        <FollowButton brand={brand} />
      </div>

      <HorizontalScroller items={data}>
        <ViewBrandCard brand={brand} />
      </HorizontalScroller>
    </>
  );
}

function ViewBrandCard({ brand }) {
  return (
    <Link
      href={`/brands/${brand}`}
      style={{ textDecoration: "none", color: "gray" }}
    >
      <div
        style={{
          display: "block",
          objectFit: "contain",
          width: "100%",
          maxWidth: "100%",
          height: "340px",
          backgroundColor: "rgb(240,240,240)",
          borderRadius: "8px",
        }}
      >
        <h1
          style={{
            display: "flex",
            height: "100%",
            margin: "0px",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
          }}
        >
          View Brand
        </h1>
      </div>
    </Link>
  );
}
