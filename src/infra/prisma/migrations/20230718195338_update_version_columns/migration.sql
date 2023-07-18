/*
  Warnings:

  - You are about to drop the column `type` on the `Version` table. All the data in the column will be lost.
  - Added the required column `name` to the `Version` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Version` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Version" DROP COLUMN "type",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
