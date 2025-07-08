import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/auth";
import { clientHttp } from "@/lib/queries/http.service";
import { Endpoints } from "@/api/endpoints";
import { getIdBody, getIdQuery } from "@/app/(utils)/utils";
import { ItemCart } from "./cart-utils";
import {
  CreateCartRequest,
  CreateCartResponse,
} from "@/api/types/item-cart-types";
import { ItemSuccess } from "@/app/item/[id]/item";
import { toast } from "sonner";
import Link from "next/link";

export function useGetItemCarts() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { id, type } = await getCurrentUser();

      return clientHttp.get<ItemCart[]>(
        `${Endpoints.CartItems}?type=${type}&${getIdQuery(id!, type)}`,
      );
    },
  });
}

export function useAddItemCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
      selectedSize,
      selectedColor,
    }: {
      data: ItemSuccess;
      selectedSize: ItemSuccess["sizes"][number];
      selectedColor: ItemSuccess["colors"][number];
    }) => {
      const { id, type } = await getCurrentUser();

      const response = await clientHttp.post<
        CreateCartRequest,
        CreateCartResponse
      >(Endpoints.CartItem, {
        itemId: data.id,
        sizeId: selectedSize.id,
        colorId: selectedColor?.id ?? null,
        quantity: 1,
        type,
        ...getIdBody(id!, type),
      } as CreateCartRequest);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success(
        <span>
          Item added to cart.{" "}
          <Link href="/cart" className="underline">
            View your cart
          </Link>
        </span>,
        {
          duration: 3000,
        },
      );
    },
    onError: (error) => {
      console.error("Error adding item to cart:", error);
      toast.error("Error adding item to cart", {
        description: "Please try again",
        duration: 3000,
      });
    },
  });
}

export const useEditItemCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      product,
      quantity,
    }: {
      product: ItemCart;
      quantity: number;
    }) => {
      if (quantity < 1) {
        return clientHttp.delete(
          `${Endpoints.CartItemById.replace(":id", product.id)}`,
        );
      }
      if (quantity > 10) {
        return Promise.resolve();
      }
      return clientHttp.put(
        `${Endpoints.CartItemById.replace(":id", product.id)}`,
        {
          quantity: quantity,
        },
      );
    },
    onMutate: ({
      product,
      quantity,
    }: {
      product: ItemCart;
      quantity: number;
    }) => {
      if (quantity > 10) {
        return Promise.resolve();
      }
      queryClient.setQueryData(["cart"], (old: ItemCart[]) => {
        return old.map((item) =>
          item.id === product.id ? { ...item, quantity: quantity } : item,
        );
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useDeleteItemCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return clientHttp.delete(`${Endpoints.CartItem}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
