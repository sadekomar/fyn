export function getOrderBy(sort_by: string | undefined) {
  enum SortBy {
    DATE_ASC = "date-ascending",
    DATE_DESC = "date-descending",
    PRICE_ASC = "price-ascending",
    PRICE_DESC = "price-descending",
    NAME_ASC = "name-ascending",
    NAME_DESC = "name-descending",
  }

  const sortByMapping: { [key: string]: { [key: string]: "asc" | "desc" } } = {
    [SortBy.DATE_ASC]: { createdAt: "asc" },
    [SortBy.DATE_DESC]: { createdAt: "desc" },
    [SortBy.PRICE_ASC]: { latestPrice: "asc" },
    [SortBy.PRICE_DESC]: { latestPrice: "desc" },
    [SortBy.NAME_ASC]: { name: "asc" },
    [SortBy.NAME_DESC]: { name: "desc" },
  };
  const orderBy: { [key: string]: "asc" | "desc" } =
    sortByMapping[sort_by || SortBy.DATE_DESC];
  return orderBy;
}
