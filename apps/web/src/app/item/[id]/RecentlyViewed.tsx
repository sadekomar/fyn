import Link from "next/link";
import { HorizontalScroller } from "@/layouts/HorizontalScroller/HorizontalScroller";
import { HttpMethods, httpService } from "@/queries/http.service";
import { ItemCardsI } from "@/types";
import { getCookie } from "@/utils/cookies.utils";

export async function RecentlyViewed() {
  const recentlyViewed = await getCookie("recently-viewed");
  const data: ItemCardsI[] = await httpService(HttpMethods.POST, "/items", {
    ids: recentlyViewed,
  });

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
