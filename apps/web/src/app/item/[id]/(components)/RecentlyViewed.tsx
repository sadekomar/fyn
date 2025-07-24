import Link from "next/link";
import { HorizontalScroller } from "@/layouts/HorizontalScroller/HorizontalScroller";
import { getItemViews } from "@/api/item-views";
import { getCurrentUser } from "@/lib/auth";

export async function RecentlyViewed() {
  const { id, type } = await getCurrentUser();

  if (!id) {
    console.log("No user ID available");
    return null;
  }

  const data = await getItemViews({ type, id }, true);

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
