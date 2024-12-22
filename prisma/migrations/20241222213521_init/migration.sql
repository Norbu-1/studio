/*
  Warnings:

  - The `courses` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `lastLogin` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "courses",
ADD COLUMN     "courses" TEXT[],
ALTER COLUMN "lastLogin" SET NOT NULL;
