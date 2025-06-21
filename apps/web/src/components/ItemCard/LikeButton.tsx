"use client";

import { useAddLike, useGetLike } from "@/app/(you)/likes/(utils)/use-likes";
import { IconButton } from "@radix-ui/themes";
import { HeartIcon } from "lucide-react";

export function LikeButton({
  id,
  className,
}: {
  id: string;
  className: string;
}) {
  const { data } = useGetLike(id);
  const { mutate: addLike } = useAddLike();

  return (
    <>
      <IconButton
        name="like button"
        className={className}
        variant="soft"
        onClick={() => {
          addLike(id);
        }}
      >
        {data?.isLiked ? (
          <HeartIcon style={{ fill: "#FF69B4" }} />
        ) : (
          <HeartIcon />
        )}
      </IconButton>
    </>
  );
}
