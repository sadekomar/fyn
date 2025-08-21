-- Add the generated column for search vector
ALTER TABLE "Item" 
ADD COLUMN IF NOT EXISTS search_vector tsvector 
GENERATED ALWAYS AS (to_tsvector('english', name || ' ' || description)) STORED;

-- Create GIN index for fast full-text search
CREATE INDEX IF NOT EXISTS idx_items_search_vector 
ON "Item" 
USING GIN (search_vector);

