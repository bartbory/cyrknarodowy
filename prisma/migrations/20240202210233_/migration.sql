/*
  Warnings:

  - You are about to drop the `GovermentVotes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "GovermentVotes";

-- CreateTable
CREATE TABLE "GovernmentVotes" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "abstain" INTEGER NOT NULL,
    "absent" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL DEFAULT '',
    "no" INTEGER NOT NULL,
    "yes" INTEGER NOT NULL,
    "sitting" INTEGER NOT NULL,
    "sittingDay" INTEGER NOT NULL,
    "term" INTEGER NOT NULL,
    "notParticipating" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL DEFAULT '',
    "topic" TEXT NOT NULL DEFAULT '',
    "totalVoted" INTEGER NOT NULL,
    "votingNumber" INTEGER NOT NULL,
    "kind" TEXT NOT NULL,

    CONSTRAINT "GovernmentVotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GovernmentVotes_id_key" ON "GovernmentVotes"("id");
