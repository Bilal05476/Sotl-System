/*
  Warnings:

  - You are about to drop the column `finalScore` on the `Informed` table. All the data in the column will be lost.
  - You are about to drop the column `savedScore` on the `Informed` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Informed` DROP COLUMN `finalScore`,
    DROP COLUMN `savedScore`,
    ADD COLUMN `facultyScore` INTEGER NULL DEFAULT 0,
    ADD COLUMN `observerScore` INTEGER NULL DEFAULT 0;
