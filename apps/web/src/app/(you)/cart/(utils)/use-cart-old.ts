import { ItemCardsI } from "@/lib/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToLocalCart,
  ItemCart,
  CartItemWithItemCard,
  getItemsFromLocalCart,
  removeFromCart,
  updateCartItemQuantity,
} from "./cart-utils";
import { useRouter } from "next/navigation";
import { clientHttp } from "@/lib/queries/http.service";
import { Endpoints } from "@/api/endpoints";
import { getUserSession } from "@/lib/auth";
import { ItemSuccess } from "@/app/item/[id]/item";

type CartRequest = {
  itemId: string;
  sizeId: string;
  colorId: string;
  quantity: number;
  userId: string;
};

type CartResponse = {
  id: string;
  itemId: string;
  sizeId: string;
  colorId: string;
  quantity: number;
};

export function useAddToCart() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return async (
    data: ItemSuccess,
    selectedSize: { id: string; name: string; available: boolean },
    selectedColor: { id: string; name: string },
  ) => {
    const session = await getUserSession();

    if (!session?.userId) {
      addToLocalCart(data, selectedSize, selectedColor);
      queryClient.refetchQueries({ queryKey: ["cart"] });
    } else {
      await clientHttp.post<CartRequest, CartResponse>(Endpoints.CartItem, {
        itemId: data.id,
        sizeId: selectedSize.id,
        colorId: selectedColor.id,
        quantity: 1,
        userId: session.userId,
      });
      queryClient.refetchQueries({ queryKey: ["cart"] });
    }
    router.push("/cart");
  };
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return async (id: string) => {
    const session = await getUserSession();

    if (!session?.userId) {
      removeFromCart(id);
      queryClient.refetchQueries({ queryKey: ["cart"] });
      router.push("/cart");
      return;
    }

    await clientHttp.delete(`${Endpoints.CartItem}/${id}`);
    queryClient.refetchQueries({ queryKey: ["cart"] });
    router.push("/cart");
  };
}

export function useGetCartItems() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const session = await getUserSession();
      let cart: ItemCart[] = [];

      if (!session) {
        cart = getItemsFromLocalCart();
      } else {
        cart = await clientHttp.get<ItemCart[]>(
          `${Endpoints.CartItems}?type=user&userId=${session.userId}`,
        );
      }

      const data = await clientHttp.post<{ ids: string[] }, ItemCardsI[]>(
        Endpoints.ItemsByIds,
        {
          ids: cart.map((item: ItemCart) => item.itemId),
        },
      );

      /**
       * merge local cart data with fetched data
       */
      const mergedData: (CartItemWithItemCard | null)[] = cart.map(
        (localCartItem) => {
          const itemCard = data.find(
            (item: ItemCardsI) => item.id === localCartItem.itemId,
          );
          if (itemCard) {
            return {
              localCartItem,
              itemCard,
            };
          }
          return null;
        },
      );

      return mergedData.filter((item) => item !== null);
    },
  });
}

export function useUpdateCartItemQuantity() {
  const queryClient = useQueryClient();

  return async (id: string, newQuantity: number) => {
    const session = await getUserSession();

    if (!session?.userId) {
      updateCartItemQuantity(id, newQuantity);
      queryClient.refetchQueries({ queryKey: ["cart"] });
      return;
    }

    await clientHttp.put(`${Endpoints.CartItemById.replace(":id", id)}`, {
      quantity: newQuantity,
    });
    queryClient.refetchQueries({ queryKey: ["cart"] });
  };
}
