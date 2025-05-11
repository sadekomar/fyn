"use client";

import { Flex, ScrollArea, IconButton, Text, Card } from "@radix-ui/themes";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";

import "../layouts/HorizontalScroller/HorizontalScroll.css";

import { IPAddress } from "../data/IPAddress";
import { FollowButton } from "./FollowButton/FollowButton";

import { HorizontalScroller } from "../layouts/HorizontalScroller/HorizontalScroller";

export function BrandScrollerClient({
  brand,
  title,
}: {
  brand: string;
  title: string;
}) {
  let [items, setItems] = useState([]);

  useEffect(() => {
    setItems([]);
    fetch(`${IPAddress}/search?brand=${brand}&limit=20&sort_by=date-descending`)
      .then((responseObject) => responseObject.json())
      .then((data) => {
        setItems(data || []);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [brand]);

  return (
    <>
      <div className="h-scroller-title">
        <h3>
          {title}
          <Link href={`/brands/${brand}`} className="brand-link">
            {brand}
          </Link>
        </h3>
        <FollowButton brand={brand} />
      </div>

      <HorizontalScroller items={items}>
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
      <Card
        style={{
          maxWidth: "285px",
          height: "auto",
          textDecoration: "none",
        }}
        variant="ghost"
      >
        <div
          style={{
            display: "block",
            objectFit: "contain",
            width: "100%",
            maxWidth: "100%",
            height: "340px",
            backgroundColor: "var(--gray-5)",
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
            }}
          >
            View Brand
          </h1>
        </div>
      </Card>
    </Link>
  );
}
