import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/auth";
import { clientHttp } from "@/lib/queries/http.service";
import { Endpoints } from "@/api/endpoints";
import {
  CreateBrandFollowRequest,
  CreateBrandFollowResponse,
  ReadFollowedBrandsResponse,
} from "./follow-types";
import { getIdBody, getIdQuery } from "@/app/(utils)/utils";

export function useAddFollowedBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (brandId: string) => {
      const { id, type } = await getCurrentUser();

      return clientHttp.post<
        CreateBrandFollowRequest,
        CreateBrandFollowResponse
      >(`${Endpoints.FollowedBrand}`, {
        brandId: brandId,
        ...getIdBody(id!, type),
        type: type,
      } as CreateBrandFollowRequest);
    },
    onMutate: (brandId: string) => {
      queryClient.cancelQueries({ queryKey: ["following"] });

      const previousData = queryClient.getQueryData(["following"]);

      queryClient.setQueryData(
        ["following"],
        (old: ReadFollowedBrandsResponse) => {
          return [...old, { brandId: brandId }];
        },
      );

      return { previousData };
    },
    onError: (error, brandId, context) => {
      queryClient.setQueryData(["following"], context?.previousData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["following"] });
    },
  });
}

export function useGetFollowedBrands() {
  return useQuery({
    queryKey: ["following"],
    queryFn: async () => {
      const { id, type } = await getCurrentUser();
      return clientHttp.get<ReadFollowedBrandsResponse>(
        `${Endpoints.FollowedBrands}?type=${type}&${getIdQuery(id!, type)}`,
      );
    },
  });
}
