"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IconButton } from "@radix-ui/themes";
import {
  addToLocalStorage,
  removeFromLocalStorage,
  getFromLocalStorage,
} from "../app/(utils)/localStorageUtils";

import { CompareIcon } from "./Icons/CustomIcons";

import * as Toast from "@radix-ui/react-toast";
import "./CompareIcon.css";

export function CompareButton({ id, className }) {
  const [open, setOpen] = React.useState(false);
  const timerRef = React.useRef(0);

  const [isFilled, setIsFilled] = useState(false);

  // Detect if button should be filled.
  useEffect(() => {
    const monitorComparison = () => {
      const compareItems = getFromLocalStorage("compare");
      const isCompared = compareItems.includes(id);
      setIsFilled(isCompared);
    };

    monitorComparison();
    window.addEventListener("localStorageChanged", monitorComparison);

    return () => {
      window.removeEventListener("localStorageChanged", monitorComparison);
    };
  }, [id]);

  const toggleIcon = (e) => {
    e.stopPropagation();
    setIsFilled((prevIsFilled) => !prevIsFilled);

    if (isFilled) {
      removeFromLocalStorage("compare", id);
      console.log(`removed ${id}`);
    } else {
      addToLocalStorage("compare", id, 2);
      console.log(`added ${id}`);
    }
  };

  return (
    <div>
      <Toast.Provider swipeDirection="right">
        <Toast.Viewport className="ToastViewport" />

        <IconButton
          variant="soft"
          className={className}
          onClick={() => {
            setOpen((currentOpenState) => !currentOpenState);
            window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => {
              setOpen(true);
            }, 100);
            toggleIcon(event);
          }}
        >
          <CompareIcon fill={isFilled ? "#A6A2DE" : "#666666"} />
        </IconButton>

        <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
          <Toast.Title className="ToastTitle">
            {isFilled
              ? "Added item to comparison"
              : "Removed item from comparison"}
          </Toast.Title>
          <Toast.Action className="ToastAction" asChild altText="view cart">
            <Link className="view-comparison-button" href={"/comparison"}>
              View
            </Link>
          </Toast.Action>
        </Toast.Root>
      </Toast.Provider>
    </div>
  );
}
