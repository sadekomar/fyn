import Link from "next/link";
import { HorizontalScroller } from "@/layouts/HorizontalScroller/HorizontalScroller";
import { useQuery } from "@tanstack/react-query";
import { getRecentlyViewed } from "@/app/(utils)/utils";

export function RecentlyViewed() {
  const { data } = useQuery({
    queryKey: ["recently-viewed"],
    queryFn: getRecentlyViewed,
  });

  if (!data || data.length === 0) {
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
