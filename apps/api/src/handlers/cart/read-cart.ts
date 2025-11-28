import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import { prisma } from "@repo/database";
import { ItemCart } from "./cart";
import { Prisma } from "@repo/database";
import { z } from "zod";

const ReadItemCartsRequestQuery = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("user"),
    userId: z.string(),
  }),
  z.object({
    type: z.literal("guest"),
    guestUserId: z.string(),
  }),
]);

export const readCartItems = handleExceptions(
  async (
    req: Request,
    res: Response<ItemCart[] | { status: "error"; error: { root: string[] } }>
  ) => {
    const parsedQuery = ReadItemCartsRequestQuery.safeParse(req.query);
    if (!parsedQuery.success) {
      return res.status(400).json({
        status: "error",
        error: {
          root: ["Invalid query parameters"],
        },
      });
    }

    const { type } = parsedQuery.data;

    let where: Prisma.ItemCartWhereInput = {};
    if (!type || (type !== "user" && type !== "guest")) {
      return res.status(400).json({
        status: "error",
        error: {
          root: ["Invalid query parameters"],
        },
      });
    }

    if (type === "user") {
      where = { userId: parsedQuery.data.userId };
    } else if (type === "guest") {
      where = { guestUserId: parsedQuery.data.guestUserId };
    }

    const cartItems = await prisma.itemCart.findMany({
      select: {
        id: true,
        itemId: true,
        item: {
          select: {
            name: true,
            link: true,
            latestPrice: true,
            brand: {
              select: {
                id: true,
                name: true,
              },
            },
            images: {
              select: {
                url: true,
              },
            },
          },
        },
        quantity: true,
        size: {
          select: {
            id: true,
            name: true,
          },
        },
        color: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        isSavedForLater: true,
      },
      where: {
        ...where,
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedCartItems: ItemCart[] = cartItems.map((cartItem) => ({
      id: cartItem.id,
      quantity: cartItem.quantity,
      size: cartItem.size,
      color: cartItem.color,
      itemId: cartItem.itemId,
      name: cartItem.item.name,
      price: cartItem.item.latestPrice,
      brand: cartItem.item.brand,
      image: cartItem.item.images[0].url,
      link: cartItem.item.link,
      isSavedForLater: cartItem.isSavedForLater,
    }));

    return res.status(200).json(formattedCartItems);
  }
);
