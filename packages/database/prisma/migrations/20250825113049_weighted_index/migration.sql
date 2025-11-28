-- 1. Drop the old generated column
DROP INDEX IF EXISTS idx_items_search_tsv;
ALTER TABLE "Item" DROP COLUMN "search_tsv";

-- 2. Add the new definition
ALTER TABLE "Item"
  ADD COLUMN "search_tsv" tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'D')
  ) STORED;

CREATE INDEX idx_items_search_tsv
  ON "Item"
  USING gin("search_tsv");