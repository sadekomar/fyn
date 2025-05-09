"use client";

import { IconButton } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

export function LikeButton({ id, className }) {
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem("likes") || "[]");
    const isLiked = likes.includes(id);
    setIsFilled(isLiked);
  }, [id]);

  const toggleIcon = (e) => {
    e.stopPropagation();
    setIsFilled((prevIsFilled) => !prevIsFilled);

    let likes = JSON.parse(localStorage.getItem("likes") || "[]");
    if (isFilled) {
      likes = likes.filter((likedId) => likedId !== id);
    } else {
      likes.push(id);
    }

    localStorage.setItem("likes", JSON.stringify(likes));
  };

  return (
    <>
      <IconButton
        name="like button"
        className={className}
        variant="soft"
        onClick={toggleIcon}
      >
        {isFilled ? (
          // <HeartFilledIcon style={{ color: "red" }} />
          <div>like</div>
        ) : (
          // <HeartIcon />
          <div>like</div>
        )}
      </IconButton>
    </>
  );
}
