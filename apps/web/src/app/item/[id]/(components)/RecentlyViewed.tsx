import Link from "next/link";
import { HorizontalScroller } from "@/layouts/HorizontalScroller/HorizontalScroller";
import { getItemViews } from "@/api/item-views";
import { getUserSession } from "@/lib/auth";
import { getGuestSession } from "@/lib/guest-session";

export async function RecentlyViewed() {
  const userSession = await getUserSession();
  const guestSession = await getGuestSession();

  const isLoggedIn = !!userSession;
  const type = isLoggedIn ? "user" : "guest";
  const id = isLoggedIn ? userSession?.userId : guestSession?.guestUserId;

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
