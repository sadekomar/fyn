import { serverHttp } from "@/lib/queries/http.service";
import "./(components)/CartPage.css";
import { CartPageClient } from "./cart-page";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Endpoints } from "@/api/endpoints";
import { getCurrentUser } from "@/lib/auth";
import { getIdQuery } from "@/app/(utils)/utils";
import { ItemCart } from "./(utils)/cart-utils";

export default async function Cart() {
  const { id, type } = await getCurrentUser();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["cart"],
    queryFn: () =>
      serverHttp.get<ItemCart[]>(
        `${Endpoints.CartItems}?type=${type}&${getIdQuery(id!, type)}`,
      ),
  });
  const initialTotal = getTotalPrice(queryClient.getQueryData(["cart"])!);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CartPageClient initialTotalPrice={initialTotal} />
    </HydrationBoundary>
  );
}

function getTotalPrice(cart: ItemCart[]) {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
}
