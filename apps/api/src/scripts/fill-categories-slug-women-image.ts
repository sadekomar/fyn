import { fillCategoriesWithSlugAndWomenImage } from "../handlers/category/fill-categories";

async function main() {
  try {
    console.log("🚀 Starting category slug and womenImage fill script...");
    await fillCategoriesWithSlugAndWomenImage();
    console.log("✅ Script completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Script failed:", error);
    process.exit(1);
  }
}

main();
