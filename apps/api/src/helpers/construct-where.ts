import { hasValidValue } from "./has-valid-value";
import { QueryI } from "../handlers/item/read-items";
import { parseSearchQuery } from "./ngram-matcher";

export function constructWhere(parsedQuery: QueryI) {
  const where: any = {};

  let { search } = parsedQuery;
  const {
    brands,
    genders,
    categories,
    colors,
    materials,
    showrooms,
    in_stock,
  } = parsedQuery;

  if (search?.trim()) {
    const matchResult = parseSearchQuery(search);

    categories.push(...matchResult.categories);
    brands.push(...matchResult.brands);
    materials.push(...matchResult.materials);
    colors.push(...matchResult.colors);
    genders.push(...matchResult.genders);

    search = matchResult.remainingQuery;
  }

  if (hasValidValue(search)) {
    where.OR = [
      {
        name: {
          contains: search,
        },
      },
      {
        description: {
          contains: search,
        },
      },
    ];
  }
  if (hasValidValue(brands)) {
    where.brand = { name: { in: brands } };
  }
  if (hasValidValue(genders)) {
    where.gender = { in: genders };
  }
  if (hasValidValue(categories)) {
    where.categories = { some: { name: { in: categories } } };
  }
  if (hasValidValue(colors)) {
    where.colors = { some: { name: { in: colors } } };
  }
  if (hasValidValue(materials)) {
    where.material = { name: { in: materials } };
  }
  if (hasValidValue(showrooms)) {
    where.showroom = { name: { in: showrooms } };
  }
  if (hasValidValue(in_stock)) {
    where.sizes = {
      some: {
        available: true,
      },
    };
  }
  return where;
}
