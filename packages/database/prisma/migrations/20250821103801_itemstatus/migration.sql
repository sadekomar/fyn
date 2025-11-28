-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('DELETED', 'IN_TRASH', 'ACTIVE');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "status" "ItemStatus" NOT NULL DEFAULT 'ACTIVE';
