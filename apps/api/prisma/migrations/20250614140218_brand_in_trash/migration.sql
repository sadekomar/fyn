-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "inTrash" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Item_inTrash_idx" ON "Item"("inTrash");
