/*
  Warnings:

  - The `startYear` column on the `Education` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `endYear` column on the `Education` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Education" DROP COLUMN "startYear",
ADD COLUMN     "startYear" TIMESTAMP(3),
DROP COLUMN "endYear",
ADD COLUMN     "endYear" TIMESTAMP(3);
