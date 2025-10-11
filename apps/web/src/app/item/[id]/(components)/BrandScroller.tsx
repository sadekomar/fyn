import Link from "next/link";

import { FollowButton } from "@/components/FollowButton/FollowButton";
import { HorizontalScroller } from "@/layouts/HorizontalScroller/HorizontalScroller";
import { serverHttp } from "@/lib/queries/http.service";

import "@/layouts/HorizontalScroller/HorizontalScroll.css";
import { ItemCardsI } from "@/lib/types";
import { Endpoints } from "@/api/endpoints";
import { ReadBrandResponse } from "@/app/brands/[brand]/(utils)/brand";

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
  const brandData = await serverHttp.get<ReadBrandResponse>(
    `${Endpoints.BrandByName.replace(":name", brand)}`,
  );

  return (
    <>
      <div className="h-scroller-title mt-10">
        <h3>
          {title}
          <Link href={`/brands/${brandData.name}`} className="brand-link">
            {brandData.label ?? brandData.name}
          </Link>
        </h3>
        <FollowButton brandData={brandData} />
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
