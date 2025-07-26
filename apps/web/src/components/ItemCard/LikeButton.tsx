"use client";

import { useAddLike, useGetLikes } from "@/app/(you)/likes/(utils)/use-likes";
import { ItemCardsI } from "@/lib/types";
import { HeartIcon } from "lucide-react";

export function LikeButton({
  id,
  className,
  item,
}: {
  id: string;
  className: string;
  item: ItemCardsI;
}) {
  const { mutate: addLike } = useAddLike();
  const { data: liked } = useGetLikes();

  return (
    <>
      <button
        name="like-button"
        className={`${className} flex items-center justify-center rounded-lg bg-gray-300/50 backdrop-blur-sm transition-all duration-300 active:scale-80`}
        onClick={() => {
          addLike(item);
        }}
      >
        {liked?.some((like) => like.id === id) ? (
          <HeartIcon style={{ fill: "#FF69B4" }} />
        ) : (
          <HeartIcon />
        )}
      </button>
    </>
  );
}
