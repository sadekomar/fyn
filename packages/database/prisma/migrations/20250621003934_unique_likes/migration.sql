/*
  Warnings:

  - A unique constraint covering the columns `[userId,itemId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[guestUserId,itemId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_itemId_key" ON "Like"("userId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_guestUserId_itemId_key" ON "Like"("guestUserId", "itemId");
