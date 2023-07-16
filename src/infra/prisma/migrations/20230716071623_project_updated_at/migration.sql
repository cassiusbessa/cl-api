/*
  Warnings:

  - You are about to drop the column `finishedAt` on the `Project` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "finishedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
