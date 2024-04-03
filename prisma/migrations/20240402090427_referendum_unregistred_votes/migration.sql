-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "unregistredUserVotesAbstain" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "unregistredUserVotesNo" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "unregistredUserVotesYes" INTEGER NOT NULL DEFAULT 0;
