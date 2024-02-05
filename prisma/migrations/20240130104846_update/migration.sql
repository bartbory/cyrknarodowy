/*
  Warnings:

  - You are about to drop the column `eductation` on the `User` table. All the data in the column will be lost.
  - The `gender` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
ALTER TYPE "Education" ADD VALUE 'NA';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "eductation",
ADD COLUMN     "education" TEXT NOT NULL DEFAULT 'Nie chce powiedzieć',
DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT NOT NULL DEFAULT 'Nie chce powiedzieć';
