-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "restrictedCategoryId" TEXT;

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_restrictedCategoryId_fkey" FOREIGN KEY ("restrictedCategoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- search_tsv
DROP INDEX IF EXISTS idx_items_search_tsv;
ALTER TABLE "Item" DROP COLUMN "search_tsv";

CREATE OR REPLACE FUNCTION public.mask_unstemmable_words(text_to_process text)
 RETURNS text
 LANGUAGE plpgsql
 IMMUTABLE
AS $function$
BEGIN
    RETURN REGEXP_REPLACE(
        text_to_process,
        -- 👇 Add or remove words here, separated by a '|' pipe character
        '\y(leggings|legging)\y',
        '\1nostem',
        'gi'
    );
END;
$function$;

CREATE OR REPLACE FUNCTION public.extract_last_path_segment(url text)
 RETURNS text
 LANGUAGE plpgsql
 IMMUTABLE
AS $function$
BEGIN
  RETURN REGEXP_REPLACE(
    REGEXP_REPLACE(url, '^.*/([^/]+)$', '\1'),
    '-', ' ', 'g'
  );
END;
$function$;


-- 2. Add the new definition
ALTER TABLE "Item"
  ADD COLUMN "search_tsv" tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', mask_unstemmable_words(coalesce(name, ''))), 'A') ||
    setweight(to_tsvector('english', mask_unstemmable_words(coalesce(description, ''))), 'D') ||
    setweight(to_tsvector('english', extract_last_path_segment(coalesce(link, ''))), 'C')
  ) STORED;

CREATE INDEX idx_items_search_tsv
  ON "Item"
  USING gin("search_tsv");