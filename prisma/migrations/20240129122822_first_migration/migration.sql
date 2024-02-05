-- CreateEnum
CREATE TYPE "Eductation" AS ENUM ('Wyzsze', 'Srednie', 'Zawodowe', 'Gimanzjalne', 'PodstawoweUkonczone', 'PodstawoweNieukonczone', 'Nieustalone');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "voidvodeship" TEXT NOT NULL,
    "birthYear" INTEGER NOT NULL,
    "eductation" "Eductation" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "term" INTEGER NOT NULL,
    "sitting" INTEGER NOT NULL,
    "sittingDay" INTEGER NOT NULL,
    "votingNum" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_voteYes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_voteNo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_voteAbstein" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_voteYes_AB_unique" ON "_voteYes"("A", "B");

-- CreateIndex
CREATE INDEX "_voteYes_B_index" ON "_voteYes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_voteNo_AB_unique" ON "_voteNo"("A", "B");

-- CreateIndex
CREATE INDEX "_voteNo_B_index" ON "_voteNo"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_voteAbstein_AB_unique" ON "_voteAbstein"("A", "B");

-- CreateIndex
CREATE INDEX "_voteAbstein_B_index" ON "_voteAbstein"("B");

-- AddForeignKey
ALTER TABLE "_voteYes" ADD CONSTRAINT "_voteYes_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_voteYes" ADD CONSTRAINT "_voteYes_B_fkey" FOREIGN KEY ("B") REFERENCES "Vote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_voteNo" ADD CONSTRAINT "_voteNo_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_voteNo" ADD CONSTRAINT "_voteNo_B_fkey" FOREIGN KEY ("B") REFERENCES "Vote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_voteAbstein" ADD CONSTRAINT "_voteAbstein_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_voteAbstein" ADD CONSTRAINT "_voteAbstein_B_fkey" FOREIGN KEY ("B") REFERENCES "Vote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
