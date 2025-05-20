-- AlterTable
ALTER TABLE "User" ADD COLUMN     "confirmationToken" TEXT,
ADD COLUMN     "tokenExpiresAt" TIMESTAMP(3);
