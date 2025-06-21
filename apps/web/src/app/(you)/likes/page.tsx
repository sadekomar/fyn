import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import LikesClientPage from "./likes-page";
import { serverHttp } from "@/lib/queries/http.service";
import { getCurrentUser } from "@/lib/auth";
import { getIdQuery } from "@/app/(utils)/utils";
import { Endpoints } from "@/api/endpoints";

export default async function LikesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["item-likes"],
    queryFn: async () => {
      const { id, type } = await getCurrentUser();
      return serverHttp.get(
        `${Endpoints.Likes}?type=${type}&${getIdQuery(id!, type)}`,
      );
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LikesClientPage />
    </HydrationBoundary>
  );
}
