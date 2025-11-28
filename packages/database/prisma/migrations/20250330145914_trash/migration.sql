/*
  Warnings:

  - The primary key for the `_BrandToShowroom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_CategoryToItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_ColorToItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_BrandToShowroom` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_CategoryToItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_ColorToItem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_BrandToShowroom" DROP CONSTRAINT "_BrandToShowroom_AB_pkey";

-- AlterTable
ALTER TABLE "_CategoryToItem" DROP CONSTRAINT "_CategoryToItem_AB_pkey";

-- AlterTable
ALTER TABLE "_ColorToItem" DROP CONSTRAINT "_ColorToItem_AB_pkey";

-- CreateTable
CREATE TABLE "Trash" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Trash_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "_BrandToShowroom_AB_unique" ON "_BrandToShowroom"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToItem_AB_unique" ON "_CategoryToItem"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_ColorToItem_AB_unique" ON "_ColorToItem"("A", "B");
