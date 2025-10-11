import { brandsList } from "@/data/brands-list";

export const config = {
  latestFromBrand: {
    label: "Asili",
    value: "asili",
  },
  brandOfTheDay: {
    label: getBrandofTheDay().toUpperCase(),
    value: getBrandofTheDay(),
  },
};

// Keep the old export for backward compatibility
export const conifg = config;

function getBrandofTheDay(): string {
  const brands = brandsList;

  // Safety check for empty brands list
  if (!brands || brands.length === 0) {
    return "asili"; // fallback brand
  }

  const startingDate = new Date(2025, 4, 5);
  const today = new Date();

  const timeDiff = today.getTime() - startingDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const brandIndex = Math.abs(daysDiff % brands.length); // Ensure positive index
  return brands[brandIndex] || "asili"; // fallback if index is invalid
}
