/*
  Warnings:

  - A unique constraint covering the columns `[userId,brandId]` on the table `BrandFollow` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[guestUserId,brandId]` on the table `BrandFollow` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BrandFollow" ADD COLUMN     "guestUserId" TEXT;

-- CreateIndex
CREATE INDEX "BrandFollow_guestUserId_idx" ON "BrandFollow"("guestUserId");

-- CreateIndex
CREATE UNIQUE INDEX "BrandFollow_userId_brandId_key" ON "BrandFollow"("userId", "brandId");

-- CreateIndex
CREATE UNIQUE INDEX "BrandFollow_guestUserId_brandId_key" ON "BrandFollow"("guestUserId", "brandId");

-- AddForeignKey
ALTER TABLE "BrandFollow" ADD CONSTRAINT "BrandFollow_guestUserId_fkey" FOREIGN KEY ("guestUserId") REFERENCES "GuestUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
