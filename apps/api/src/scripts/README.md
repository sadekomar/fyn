# Scripts

This directory contains utility scripts for the Loom Node application.

## fill-categories-slug-women-image.ts

This script fills existing categories in the database with slug and womenImage data from the `allCategoriesData` object.

### Usage

```bash
npm run fill-categories
```

### What it does

1. Iterates through all categories in the `allCategoriesData` object
2. For each category:
   - Generates a slug by converting the category name to kebab-case (e.g., "t-shirts" → "t-shirts", "linen shirts" → "linen-shirts")
   - Uses the `image` field as the `womenImage`
   - Updates the corresponding category in the database

### Database fields updated

- `slug`: URL-friendly version of the category name
- `womenImage`: Image URL for the category

### Example

For a category named "t-shirts" with image "/categories/t-shirts.webp":

- `slug` will be set to "t-shirts"
- `womenImage` will be set to "/categories/t-shirts.webp"

### Notes

- The script only updates categories that already exist in the database
- Categories not found in the database will be logged as warnings
- The script is safe to run multiple times as it only updates existing records
