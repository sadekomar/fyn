import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import AccountClientPage from "./account-page";
import { getUserSession } from "@/lib/auth";
import { Endpoints } from "@/api/endpoints";
import { serverHttp } from "@/lib/queries/http.service";
import { ReadUserFullResponse } from "@/api/types/user-types";

export default async function AccountPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const session = await getUserSession();
      if (!session) return null;
      return serverHttp.get<ReadUserFullResponse>(
        Endpoints.UserById.replace(":id", session.userId),
      );
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AccountClientPage />
    </HydrationBoundary>
  );
}
