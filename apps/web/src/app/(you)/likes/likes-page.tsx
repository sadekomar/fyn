"use client";

import "../../item/[id]/(components)/ItemPage.css";

import { GridLayout } from "@/layouts/GridLayout/GridLayout";
import { EmptyState } from "@/components/EmptyState/EmptyState";

import { PageTitle } from "@/components/PageTitle/PageTitle";
import { ItemCardPlaceholder } from "@/components/ItemCard/ItemCardPlaceholder";
import Link from "next/link";
import { useGetLikes } from "./(utils)/use-likes";

export default function LikesClientPage() {
  const { data = [], isPending, error } = useGetLikes();

  if (isPending) {
    return (
      <>
        <PageTitle>Likes</PageTitle>
        <div className="wrapper">
          <div className="loom-grid">
            {[...Array(100)].map((_, index) => (
              <ItemCardPlaceholder key={index} />
            ))}
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return <div>An error occurred</div>;
  }

  if (data?.length === 0) {
    return (
      <>
        <PageTitle>Likes</PageTitle>
        <EmptyState title={"There are no likes yet"}>
          <p>
            There are no liked items yet.{" "}
            <Link className="inline-link" href={"/all-categories"}>
              Continue shopping
            </Link>{" "}
            our wide range of products and click the heart icon to save your
            favorites here for easy access. Happy{" "}
            <Link className="inline-link" href={"/all-categories"}>
              shopping
            </Link>
            !
          </p>
        </EmptyState>
      </>
    );
  }

  return (
    <>
      <PageTitle>Likes</PageTitle>
      <GridLayout items={data} />
    </>
  );
}
