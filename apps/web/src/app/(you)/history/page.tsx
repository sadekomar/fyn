import { GridLayout } from "@/layouts/GridLayout/GridLayout";
import { PageTitle } from "@/components/PageTitle/PageTitle";

import "./HistoryPage.css";

import Link from "next/link";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { getUserSession } from "@/lib/auth";
import { getGuestSession } from "@/lib/guest-session";
import { getItemViews } from "@/api/item-views";
import { ClearHistoryButton } from "./clear-history";

export default async function HistoryPage() {
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

  if (!data || data.length === 0) {
    return (
      <>
        <PageTitle>History</PageTitle>
        <EmptyState title={"You haven't viewed anything yet."}>
          <p>
            <Link className="inline-link" href={"/all-categories"}>
              Continue shopping
            </Link>{" "}
            our wide range of items and the ones you viewed will appear here.
            <br />
            <br />
            Not sure what you're looking for exactly? Explore our{" "}
            <Link className="inline-link" href={"/shop"}>
              Shop
            </Link>{" "}
            to discover new items and brands.
          </p>
        </EmptyState>
      </>
    );
  }

  return (
    <>
      <PageTitle>History</PageTitle>
      <div className="subheading-wrapper">
        <p>{data && data.length} Items</p>
        <ClearHistoryButton type={type} id={id} />
      </div>

      <GridLayout items={data} />
    </>
  );
}
