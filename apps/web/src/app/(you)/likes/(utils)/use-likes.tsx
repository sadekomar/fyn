import { Endpoints } from "@/api/endpoints";
import { getIdBody, getIdQuery } from "@/app/(utils)/utils";
import { getCurrentUser } from "@/lib/auth";
import { clientHttp } from "@/lib/queries/http.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateLikeRequest,
  CreateLikeResponse,
  ReadLikeResponse,
} from "./like-types";
import { ItemCardsI } from "@/lib/types";

export const useAddLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: ItemCardsI) => {
      const { id, type } = await getCurrentUser();

      return clientHttp.post<CreateLikeRequest, CreateLikeResponse>(
        `${Endpoints.Like}`,
        {
          itemId: item.id,
          type,
          ...getIdBody(id!, type),
        } as CreateLikeRequest,
      );
    },
    onMutate: async (item) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["likes"] });

      // Snapshot the previous value
      const previousLikes = queryClient.getQueryData<ItemCardsI[]>(["likes"]);

      // Optimistically update to the new value
      queryClient.setQueryData<ItemCardsI[]>(["likes"], (old = []) => {
        // Check if item is already liked
        const isAlreadyLiked = old.some((like) => like.id === item.id);

        if (isAlreadyLiked) {
          // Remove the item if already liked (toggle off)
          return old.filter((like) => like.id !== item.id);
        } else {
          // Add the item if not liked (toggle on)
          return [...old, item];
        }
      });

      // Return a context object with the snapshotted value
      return { previousLikes };
    },
    onSuccess: () => {
      // Refetch after success to ensure data consistency
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    },
    onError: (error, item, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousLikes) {
        queryClient.setQueryData(["likes"], context.previousLikes);
      }
    },
  });
};

export const useGetLikes = () => {
  return useQuery({
    queryKey: ["likes"],
    queryFn: async () => {
      const { id, type } = await getCurrentUser();
      return clientHttp.get<ItemCardsI[]>(
        `${Endpoints.Likes}?type=${type}&${getIdQuery(id!, type)}`,
      );
    },
  });
};

export const useDeleteLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) => {
      return clientHttp.delete(`${Endpoints.Like}/${itemId}`);
    },
    onMutate: async (itemId) => {
      await queryClient.cancelQueries({ queryKey: ["likes"] });
      const previousLikes = queryClient.getQueryData<ItemCardsI[]>(["likes"]);

      queryClient.setQueryData<ItemCardsI[]>(["likes"], (old = []) => {
        return old.filter((like) => like.id !== itemId);
      });

      return { previousLikes };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    },
    onError: (error, itemId, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData(["likes"], context.previousLikes);
      }
    },
  });
};

export const useEditLike = () => {
  return useMutation({
    mutationFn: (itemId: string) => {
      return clientHttp.put(`${Endpoints.Like}/${itemId}`, {
        itemId,
      });
    },
  });
};
