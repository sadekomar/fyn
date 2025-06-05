import Link from "next/link";

import { FollowButton } from "@/components/FollowButton/FollowButton";
import { HorizontalScroller } from "@/layouts/HorizontalScroller/HorizontalScroller";
import {
  httpService,
  HttpMethods,
  serverHttp,
} from "@/lib/queries/http.service";

import "@/layouts/HorizontalScroller/HorizontalScroll.css";
import { ItemCardsI } from "@/lib/types";

export async function BrandScroller({
  brand,
  title,
}: {
  brand: string;
  title: string;
}) {
  const data: ItemCardsI[] = await serverHttp.get(
    `/items?brands=${brand}&limit=20&sort_by=date-descending`,
  );

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

function ViewBrandCard({ brand }: { brand: string }) {
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
