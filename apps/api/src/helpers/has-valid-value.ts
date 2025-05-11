export const hasValidValue = (param: any): boolean => {
  if (param === undefined || param === null) return false;
  if (param === "") return false;
  if (
    Array.isArray(param) &&
    (param.length === 0 || param.every((p) => p === ""))
  )
    return false;
  return true;
};
