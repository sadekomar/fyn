/*
  Warnings:

  - Added the required column `updatedAt` to the `BrandView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CategoryView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ItemView` table without a default value. This is not possible if the table is not empty.
  - Made the column `phoneNumber` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BrandView" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CategoryView" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isThumbnail" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ItemView" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phoneNumber" SET NOT NULL;
