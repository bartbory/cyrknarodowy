-- DropForeignKey
ALTER TABLE "_voteAbstain" DROP CONSTRAINT "_voteAbstain_A_fkey";

-- DropForeignKey
ALTER TABLE "_voteAbstain" DROP CONSTRAINT "_voteAbstain_B_fkey";

-- DropForeignKey
ALTER TABLE "_voteNo" DROP CONSTRAINT "_voteNo_A_fkey";

-- DropForeignKey
ALTER TABLE "_voteNo" DROP CONSTRAINT "_voteNo_B_fkey";

-- DropForeignKey
ALTER TABLE "_voteYes" DROP CONSTRAINT "_voteYes_A_fkey";

-- DropForeignKey
ALTER TABLE "_voteYes" DROP CONSTRAINT "_voteYes_B_fkey";

-- AddForeignKey
ALTER TABLE "_voteYes" ADD CONSTRAINT "_voteYes_A_fkey" FOREIGN KEY ("A") REFERENCES "GovernmentVotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_voteYes" ADD CONSTRAINT "_voteYes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_voteNo" ADD CONSTRAINT "_voteNo_A_fkey" FOREIGN KEY ("A") REFERENCES "GovernmentVotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_voteNo" ADD CONSTRAINT "_voteNo_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_voteAbstain" ADD CONSTRAINT "_voteAbstain_A_fkey" FOREIGN KEY ("A") REFERENCES "GovernmentVotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_voteAbstain" ADD CONSTRAINT "_voteAbstain_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
