-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "search_tsv" tsvector GENERATED ALWAYS AS (to_tsvector('english', coalesce(name, '')) || to_tsvector('english', coalesce(description, ''))) STORED;

-- CreateIndex
CREATE INDEX "idx_items_search_tsv" ON "Item" USING GIN ("search_tsv");

