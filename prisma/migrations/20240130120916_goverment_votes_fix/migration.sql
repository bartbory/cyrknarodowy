/*
  Warnings:

  - You are about to drop the column `votesMp` on the `GovermentVotes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GovermentVotes" DROP COLUMN "votesMp",
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "notParticipating" SET DEFAULT 0,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "topic" DROP NOT NULL;
