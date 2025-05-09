import Link from "next/link";
import { HorizontalScroller } from "@/layouts/HorizontalScroller/HorizontalScroller";
import { ItemCardsI } from "@/types";

export async function RecentlyViewed({ data }: { data: ItemCardsI[] }) {
  if (data.length === 0) {
    return null;
  }

  return (
    <>
      <div className="h-scroller-title">
        <Link className="h-scroller-title-link" href={"/history"}>
          Recently Viewed
        </Link>
      </div>
      <HorizontalScroller items={data} />
    </>
  );
}
