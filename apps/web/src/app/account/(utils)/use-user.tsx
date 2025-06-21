import { useQuery } from "@tanstack/react-query";
import { getUserSession } from "@/lib/auth";
import { clientHttp } from "@/lib/queries/http.service";
import { ReadUserCheckoutResponse } from "@/api/types/user-types";
import { Endpoints } from "@/api/endpoints";

export const useGetUserData = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const session = await getUserSession();
      if (!session?.userId) return null;
      return clientHttp.get<ReadUserCheckoutResponse>(
        `${Endpoints.User}/${session.userId}`,
      );
    },
  });
};
