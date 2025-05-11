// @ts-nocheck
"use client";
import { Flex, Button, AlertDialog } from "@radix-ui/themes";
import React, { useRef, useEffect, useState } from "react";

import { IPAddress } from "@/data/IPAddress";
import { GridLayout } from "@/layouts/GridLayout/GridLayout";
import { PageTitle } from "@/components/PageTitle/PageTitle";

import "./HistoryPage.css";

import Link from "next/link";
import { ItemCardPlaceholder } from "@/components/ItemCard/ItemCardPlaceholder";
import { EmptyState } from "@/components/EmptyState/EmptyState";

export default function HistoryPage() {
  const abortControllerRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    // const recentlyViewed = getCookie("recentlyViewed");
    let recentlyViewedString = recentlyViewed.join(",");

    async function fetchData(recentlyViewedString) {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      setIsLoading(true);

      try {
        if (recentlyViewed != 0) {
          const response = await fetch(
            `${IPAddress}/ids?ids=${recentlyViewedString}`,
            {
              signal: abortControllerRef.current?.signal,
            },
          );
          const data = await response.json();
          setProducts(data);
        } else {
          setIsEmpty(true);
        }
      } catch (e) {
        if (e.name == "AbortError") {
          return;
        }
        setError(e);
      }
      setIsLoading(false);
    }

    fetchData(recentlyViewedString);

    const updateRecentlyViewed = (event) => {
      if (event.key === "recentlyViewed") {
        const recentlyViewed = JSON.parse(
          localStorage.getItem("recentlyViewed") || "[]",
        );
        recentlyViewed.reverse();
        let recentlyViewedString = recentlyViewed.join(",");

        fetchData(recentlyViewedString);
      }
    };

    window.addEventListener("storage", updateRecentlyViewed);

    return () => {
      window.removeEventListener("storage", updateRecentlyViewed);
    };
  }, []);

  if (isLoading) {
    return (
      <>
        <PageTitle>History</PageTitle>
        <div className="wrapper">
          <div className="grid">
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

  if (isEmpty) {
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
            <Link className="inline-link" href={"/infinite-scroller"}>
              Infinite Brands
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
        <p>{products && products.length} Items</p>
        <ClearHistoryButton setProducts={setProducts} setIsEmpty={setIsEmpty} />
      </div>

      <GridLayout items={products} />
    </>
  );
}

function ClearHistoryButton({ setProducts, setIsEmpty }) {
  function clearHistory() {
    localStorage.removeItem("recentlyViewed");
    setProducts(null);
    setIsEmpty(true);
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="soft" className="alert-dialog-button">
          Clear History
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content
        className="alert-dialog-content"
        style={{ maxWidth: "450px" }}
      >
        <AlertDialog.Title>Clear History</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure? Your browsing history will be cleared, and you won't be
          able to restore it.
        </AlertDialog.Description>

        <Flex gap="2" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" className="alert-dialog-button">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              px={2}
              onClick={clearHistory}
              className="alert-dialog-button"
              color="red"
            >
              Clear History
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
