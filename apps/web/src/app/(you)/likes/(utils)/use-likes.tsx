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
    mutationFn: async (itemId: string) => {
      const { id, type } = await getCurrentUser();

      return clientHttp.post<CreateLikeRequest, CreateLikeResponse>(
        `${Endpoints.Like}`,
        {
          itemId,
          type,
          ...getIdBody(id!, type),
        } as CreateLikeRequest,
      );
    },
    onMutate: async (itemId) => {
      await queryClient.cancelQueries({ queryKey: ["item-like", itemId] });
      const previousData = queryClient.getQueryData(["item-like", itemId]);
      queryClient.setQueryData(["item-like", itemId], (old: any) => ({
        isLiked: !old.isLiked,
      }));
      return { previousData };
    },
    onSuccess: (_, itemId) => {
      queryClient.invalidateQueries({ queryKey: ["item-like", itemId] });
      queryClient.invalidateQueries({ queryKey: ["item-likes"] });
    },
    onError: (error, itemId, context) => {
      queryClient.setQueryData(["item-like", itemId], context?.previousData);
    },
  });
};

export const useGetLike = (itemId: string) => {
  return useQuery({
    queryKey: ["item-like", itemId],
    queryFn: async () => {
      const { id, type } = await getCurrentUser();
      return clientHttp.get<ReadLikeResponse>(
        `${Endpoints.Like}?type=${type}&${getIdQuery(id!, type)}&itemId=${itemId}`,
      );
    },
  });
};

export const useGetLikes = () => {
  return useQuery({
    queryKey: ["item-likes"],
    queryFn: async () => {
      const { id, type } = await getCurrentUser();
      return clientHttp.get<ItemCardsI[]>(
        `${Endpoints.Likes}?type=${type}&${getIdQuery(id!, type)}`,
      );
    },
  });
};

export const useDeleteLike = () => {
  return useMutation({
    mutationFn: (itemId: string) => {
      return clientHttp.delete(`${Endpoints.Like}/${itemId}`);
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
