/*
  Warnings:

  - You are about to drop the column `message` on the `Applicant` table. All the data in the column will be lost.
  - Added the required column `whyLoom` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whyYou` to the `Applicant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Applicant" DROP COLUMN "message",
ADD COLUMN     "whyLoom" TEXT NOT NULL,
ADD COLUMN     "whyYou" TEXT NOT NULL;
