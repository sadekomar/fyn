import { brandsList } from "@/data/brands-list";

export const conifg = {
  latestFromBrand: {
    label: "Asili",
    value: "asili",
  },
  brandOfTheDay: {
    label: getBrandofTheDay().toUpperCase(),
    value: getBrandofTheDay(),
  },
};

function getBrandofTheDay(): string {
  const brands = brandsList;
  const startingDate = new Date(2025, 4, 5);
  const today = new Date();

  const timeDiff = today.getTime() - startingDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const brandIndex = daysDiff % brands.length;
  return brands[brandIndex];
}
