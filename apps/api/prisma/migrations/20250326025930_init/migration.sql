-- CreateEnum
CREATE TYPE "NewsletterType" AS ENUM ('CAREERS', 'NEWSLETTER');

-- CreateTable
CREATE TABLE "Newsletter" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" "NewsletterType" NOT NULL DEFAULT 'NEWSLETTER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("id")
);
