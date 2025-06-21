-- AlterTable
ALTER TABLE "ItemCart" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ItemView" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isPasswordReset" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "BrandView_guestUserId_idx" ON "BrandView"("guestUserId");

-- CreateIndex
CREATE INDEX "CategoryView_guestUserId_idx" ON "CategoryView"("guestUserId");

-- CreateIndex
CREATE INDEX "ItemCart_deletedAt_idx" ON "ItemCart"("deletedAt");

-- CreateIndex
CREATE INDEX "ItemCart_itemId_idx" ON "ItemCart"("itemId");

-- CreateIndex
CREATE INDEX "ItemCart_userId_idx" ON "ItemCart"("userId");

-- CreateIndex
CREATE INDEX "ItemCart_guestUserId_idx" ON "ItemCart"("guestUserId");

-- CreateIndex
CREATE INDEX "ItemView_deletedAt_idx" ON "ItemView"("deletedAt");

-- CreateIndex
CREATE INDEX "ItemView_guestUserId_idx" ON "ItemView"("guestUserId");
