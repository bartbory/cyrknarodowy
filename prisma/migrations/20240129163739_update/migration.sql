/*
  Warnings:

  - The `eductation` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Education" AS ENUM ('Wyzsze', 'Srednie', 'Zawodowe', 'Gimanzjalne', 'PodstawoweUkonczone', 'PodstawoweNieukonczone', 'Nieustalone');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Kobieta', 'Mezczyzna', 'Niebinarna');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gender" "Gender",
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "postalCode" DROP NOT NULL,
ALTER COLUMN "voidvodeship" DROP NOT NULL,
ALTER COLUMN "birthYear" DROP NOT NULL,
DROP COLUMN "eductation",
ADD COLUMN     "eductation" "Education";

-- DropEnum
DROP TYPE "Eductation";
