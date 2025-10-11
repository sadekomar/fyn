-- DropIndex
DROP INDEX "Brand_name_key";

-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "gender" "Gender";

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
