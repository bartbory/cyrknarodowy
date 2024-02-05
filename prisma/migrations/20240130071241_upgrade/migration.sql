/*
  Warnings:

  - The values [Kobieta,Mezczyzna,Niebinarna] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `_voteAbstein` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('Female', 'Male', 'NonBinary', 'NA');
ALTER TABLE "User" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "_voteAbstein" DROP CONSTRAINT "_voteAbstein_A_fkey";

-- DropForeignKey
ALTER TABLE "_voteAbstein" DROP CONSTRAINT "_voteAbstein_B_fkey";

-- DropTable
DROP TABLE "_voteAbstein";

-- CreateTable
CREATE TABLE "_voteAbstain" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_voteAbstain_AB_unique" ON "_voteAbstain"("A", "B");

-- CreateIndex
CREATE INDEX "_voteAbstain_B_index" ON "_voteAbstain"("B");

-- AddForeignKey
ALTER TABLE "_voteAbstain" ADD CONSTRAINT "_voteAbstain_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_voteAbstain" ADD CONSTRAINT "_voteAbstain_B_fkey" FOREIGN KEY ("B") REFERENCES "Vote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
