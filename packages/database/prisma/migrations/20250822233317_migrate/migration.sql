/*
  Warnings:

  - You are about to drop the `_CategoryToItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "LabelStatus" AS ENUM ('PENDING', 'AUTO_LABEL', 'MANUAL_LABEL');

-- DropForeignKey
ALTER TABLE "_CategoryToItem" DROP CONSTRAINT "_CategoryToItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToItem" DROP CONSTRAINT "_CategoryToItem_B_fkey";

-- DropTable
DROP TABLE "_CategoryToItem";

-- CreateTable
CREATE TABLE "CategoryItem" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "confidence" INTEGER,
    "score" DOUBLE PRECISION,
    "status" "LabelStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CategoryItem_itemId_idx" ON "CategoryItem"("itemId");

-- CreateIndex
CREATE INDEX "CategoryItem_categoryId_idx" ON "CategoryItem"("categoryId");

-- AddForeignKey
ALTER TABLE "CategoryItem" ADD CONSTRAINT "CategoryItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryItem" ADD CONSTRAINT "CategoryItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
