/*
  Warnings:

  - Added the required column `brandId` to the `ShippingEstimate` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('NORMAL', 'BILLING');

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "addressType" "AddressType" NOT NULL DEFAULT 'NORMAL';

-- AlterTable
ALTER TABLE "ShippingEstimate" ADD COLUMN     "brandId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ShippingEstimate" ADD CONSTRAINT "ShippingEstimate_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
