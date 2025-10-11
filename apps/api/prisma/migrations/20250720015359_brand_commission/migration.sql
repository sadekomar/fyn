/*
  Warnings:

  - You are about to drop the column `comissionPercentage` on the `Brand` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "comissionPercentage",
ADD COLUMN     "commissionPercentage" INTEGER,
ADD COLUMN     "keywords" TEXT[];
