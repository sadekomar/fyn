import { Request, Response } from "express";
import prisma from "../../helpers/prisma";
import { OnSaleCard } from "./item";
import { handleExceptions } from "../../helpers/utils";

export const readOnSale = handleExceptions(
  async (
    req: Request,
    res: Response<OnSaleCard[] | { status: "error"; error: string }>
  ) => {
    // items where latestPrice is lower than any price in the prices array
    // Use a raw SQL query to get items where the latest price is less than any previous price (on sale)
    const items = await prisma.$queryRawUnsafe(`
    SELECT 
      i.id,
      i.name,
      i."isSoldOut",
      b.name AS "brandName",
      b.label AS "brandLabel",
      p_latest.price AS price,
      p_high.price AS "highestPrice",
      img.url AS image
    FROM "Item" i
    JOIN "Brand" b ON i."brandId" = b.id
    JOIN LATERAL (
      SELECT price, "createdAt"
      FROM "Price"
      WHERE "itemId" = i.id
      ORDER BY "createdAt" DESC
      LIMIT 1
    ) p_latest ON true
    JOIN LATERAL (
      SELECT price
      FROM "Price"
      WHERE "itemId" = i.id
      ORDER BY price DESC
      LIMIT 1
    ) p_high ON true
    LEFT JOIN LATERAL (
      SELECT url
      FROM "Image"
      WHERE "itemId" = i.id
      LIMIT 1
    ) img ON true
    WHERE i."inTrash" = false
      AND EXISTS (
        SELECT 1
        FROM "Price" p_prev
        WHERE p_prev."itemId" = i.id
          AND p_prev."createdAt" < p_latest."createdAt"
          AND p_prev.price > p_latest.price
      )
    ORDER BY i."createdAt" DESC
    LIMIT 20
  `);

    // Transform the raw query results to match OnSaleCard type
    const transformedItems: OnSaleCard[] = (items as any[]).map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      highestPrice: item.highestPrice,
      brand: {
        name: item.brandName,
        label: item.brandLabel,
      },
      image: item.image,
      isSoldOut: item.isSoldOut,
    }));

    return res.status(200).json(transformedItems);
  }
);
