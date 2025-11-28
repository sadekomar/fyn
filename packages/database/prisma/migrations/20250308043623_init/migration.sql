/*
  Warnings:

  - You are about to drop the `_ItemToSize` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `itemId` to the `Size` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ItemToSize" DROP CONSTRAINT "_ItemToSize_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToSize" DROP CONSTRAINT "_ItemToSize_B_fkey";

-- AlterTable
ALTER TABLE "Size" ADD COLUMN     "itemId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ItemToSize";

-- AddForeignKey
ALTER TABLE "Size" ADD CONSTRAINT "Size_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
