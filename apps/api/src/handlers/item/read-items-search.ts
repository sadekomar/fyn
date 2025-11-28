import { handleExceptions } from "../../helpers/utils";
import { Request, Response } from "express";
import { prisma } from "@repo/database";
import { ItemCardsI } from "./item";

export const readItemsSearch = handleExceptions(
  async (req: Request, res: Response): Promise<Response<ItemCardsI[]>> => {
    const { search } = req.query;

    const items = await prisma.$queryRaw<
      Array<{
        id: string;
        name: string;
        latestPrice: number;
        isSoldOut: boolean;
        brandName: string;
        brandLabel: string;
        isPartnerBrand: boolean;
        imageUrl: string;
        rank: number;
      }>
    >`
      SELECT 
        i."id",
        i."name",
        i."latestPrice",
        i."isSoldOut",
        b."name" as "brandName",
        b."label" as "brandLabel",
        b."isPartnerBrand",
        img."url" as "imageUrl",
        ts_rank(i."search_tsv", plainto_tsquery(mask_unstemmable_words(${search}))) as rank
      FROM "Item" i
      LEFT JOIN "Brand" b ON i."brandId" = b."id"
      LEFT JOIN "Image" img ON i."id" = img."itemId"
      WHERE i."search_tsv" @@ plainto_tsquery(mask_unstemmable_words(${search})) AND i."inTrash" = false
      ORDER BY rank DESC
      LIMIT 300
    `;

    return res.status(200).json(
      items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.latestPrice,
        brand: {
          name: item.brandName,
          label: item.brandLabel,
          isPartneredBrand: item.isPartnerBrand,
        },
        image: item.imageUrl,
        isSoldOut: item.isSoldOut,
      }))
    );
  }
);
