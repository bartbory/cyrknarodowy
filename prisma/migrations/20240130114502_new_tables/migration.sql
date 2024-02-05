-- CreateTable
CREATE TABLE "GovermentVotes" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "abstain" INTEGER NOT NULL,
    "absent" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "no" INTEGER NOT NULL,
    "yes" INTEGER NOT NULL,
    "sitting" INTEGER NOT NULL,
    "sittingDay" INTEGER NOT NULL,
    "term" INTEGER NOT NULL,
    "notParticipating" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "totalVoted" INTEGER NOT NULL,
    "votingNumber" INTEGER NOT NULL,
    "kind" TEXT NOT NULL,
    "votesMp" INTEGER NOT NULL,

    CONSTRAINT "GovermentVotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MPVote" (
    "MP" INTEGER NOT NULL,
    "club" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "secondName" TEXT NOT NULL,
    "vote" TEXT NOT NULL,
    "listVotes" TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "GovermentVotes_id_key" ON "GovermentVotes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MPVote_MP_key" ON "MPVote"("MP");
