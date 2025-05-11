import { hasValidValue } from "./has-valid-value";
import { QueryI } from "../handlers/get-all-items.handler";

export function constructWhere(parsedQuery: QueryI) {
  const where: any = {};

  const {
    search,
    brands,
    genders,
    categories,
    colors,
    materials,
    showrooms,
    in_stock,
  } = parsedQuery;

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
