/*
  Warnings:

  - Made the column `description` on table `GovermentVotes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `GovermentVotes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `topic` on table `GovermentVotes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GovermentVotes" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "title" SET DEFAULT '',
ALTER COLUMN "topic" SET NOT NULL,
ALTER COLUMN "topic" SET DEFAULT '';
