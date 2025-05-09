import Link from "next/link";
import { getCookie } from "@/app/(utils)/cookies.utils";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { BrandScrollerClient } from "@/components/BrandScrollerClient";
import { BrandInfo } from "@/components/BrandInfo";

export async function FollowedBrands() {
  const followingArray = await getCookie("following");

  if (followingArray.length == 0) {
    return (
      <>
        <PageTitle>
          Brands You{" "}
          <Link href={"/following"} className="inline-link">
            Follow
          </Link>
        </PageTitle>
        <EmptyState title={"You haven't followed any Brands yet."}>
          <p>
            Go to{" "}
            <Link className="inline-link" href={"/brands"}>
              All Brands
            </Link>{" "}
            and start following your favorite brands to keep up with their
            latest releases. Or explore our{" "}
            <Link className="inline-link" href={"/infinite-scroller"}>
              infinite scroll
            </Link>{" "}
            to discover new items and brands.
          </p>
        </EmptyState>
      </>
    );
  }

  return (
    <>
      <PageTitle>
        Brands You{" "}
        <Link href={"/following"} className="inline-link">
          Follow
        </Link>
      </PageTitle>

      {followingArray.map((brand, index) => (
        <BrandScrollerClient
          key={index}
          BrandInfo={<BrandInfo brand={brand} />}
          brand={brand}
        />
      ))}
    </>
  );
}
