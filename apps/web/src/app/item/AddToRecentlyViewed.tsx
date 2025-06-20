"use client";
import { useEffect } from "react";
import { useGetGuest, useGetUser } from "@/lib/use-auth";
import { postItemView } from "@/api/item-views";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getIdBody } from "../(utils)/utils";
import { CreateItemViewRequest } from "@/api/types/item-view-types";

export function AddToRecentlyViewed({ itemId }: { itemId: string }) {
  const user = useGetUser();
  const guest = useGetGuest();
  const type = user ? "user" : "guest";
  const id = user ? user.userId : guest?.guestUserId;

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
