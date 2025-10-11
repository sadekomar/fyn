"use client";
import { useEffect } from "react";
import { useGetCurrentUser } from "@/lib/use-auth";
import { postItemView } from "@/api/item-views";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getIdBody } from "../(utils)/utils";
import { CreateItemViewRequest } from "@/api/types/item-view-types";

export function AddToRecentlyViewed({ itemId }: { itemId: string }) {
  const { id, type } = useGetCurrentUser();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => {
      return postItemView(
        {
          type,
          itemId,
          ...getIdBody(id!, type),
        } as CreateItemViewRequest,
        false,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["item-views"] });
    },
    onError: (error) => {
      console.error("Error adding item to recently viewed:", error);
    },
  });

  useEffect(() => {
    if (id && itemId) {
      mutate();
    }
  }, [itemId, type, id, mutate]);

  return null;
}
