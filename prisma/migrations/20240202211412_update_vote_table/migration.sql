/*
  Warnings:

  - You are about to drop the column `date` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `sitting` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `sittingDay` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `term` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `topic` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `votingNumber` on the `Vote` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "date",
DROP COLUMN "description",
DROP COLUMN "sitting",
DROP COLUMN "sittingDay",
DROP COLUMN "term",
DROP COLUMN "title",
DROP COLUMN "topic",
DROP COLUMN "votingNumber";
