-- CreateIndex
CREATE INDEX "BrandView_brandId_idx" ON "BrandView"("brandId");

-- CreateIndex
CREATE INDEX "BrandView_userId_idx" ON "BrandView"("userId");

-- CreateIndex
CREATE INDEX "CategoryView_categoryId_idx" ON "CategoryView"("categoryId");

-- CreateIndex
CREATE INDEX "CategoryView_userId_idx" ON "CategoryView"("userId");

-- CreateIndex
CREATE INDEX "Image_itemId_idx" ON "Image"("itemId");

-- CreateIndex
CREATE INDEX "Item_brandId_idx" ON "Item"("brandId");

-- CreateIndex
CREATE INDEX "Item_materialId_idx" ON "Item"("materialId");

-- CreateIndex
CREATE INDEX "ItemView_itemId_idx" ON "ItemView"("itemId");

-- CreateIndex
CREATE INDEX "ItemView_userId_idx" ON "ItemView"("userId");

-- CreateIndex
CREATE INDEX "Like_itemId_idx" ON "Like"("itemId");

-- CreateIndex
CREATE INDEX "Like_userId_idx" ON "Like"("userId");

-- CreateIndex
CREATE INDEX "Price_itemId_createdAt_idx" ON "Price"("itemId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Size_itemId_idx" ON "Size"("itemId");
