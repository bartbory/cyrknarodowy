/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "education" SET DEFAULT 'Nie chcę powiedzieć',
ALTER COLUMN "gender" SET DEFAULT 'Nie chcę powiedzieć';

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "topic" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "_referendumVoteYes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_referendumVoteNo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_referendumVoteAbstain" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_referendumVoteYes_AB_unique" ON "_referendumVoteYes"("A", "B");

-- CreateIndex
CREATE INDEX "_referendumVoteYes_B_index" ON "_referendumVoteYes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_referendumVoteNo_AB_unique" ON "_referendumVoteNo"("A", "B");

-- CreateIndex
CREATE INDEX "_referendumVoteNo_B_index" ON "_referendumVoteNo"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_referendumVoteAbstain_AB_unique" ON "_referendumVoteAbstain"("A", "B");

-- CreateIndex
CREATE INDEX "_referendumVoteAbstain_B_index" ON "_referendumVoteAbstain"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_id_key" ON "Vote"("id");

-- AddForeignKey
ALTER TABLE "_referendumVoteYes" ADD CONSTRAINT "_referendumVoteYes_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_referendumVoteYes" ADD CONSTRAINT "_referendumVoteYes_B_fkey" FOREIGN KEY ("B") REFERENCES "Vote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_referendumVoteNo" ADD CONSTRAINT "_referendumVoteNo_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_referendumVoteNo" ADD CONSTRAINT "_referendumVoteNo_B_fkey" FOREIGN KEY ("B") REFERENCES "Vote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_referendumVoteAbstain" ADD CONSTRAINT "_referendumVoteAbstain_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_referendumVoteAbstain" ADD CONSTRAINT "_referendumVoteAbstain_B_fkey" FOREIGN KEY ("B") REFERENCES "Vote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
