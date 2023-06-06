/*
  Warnings:

  - You are about to drop the column `draftScore` on the `Informed` table. All the data in the column will be lost.
  - You are about to drop the column `finalScore` on the `Informed` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Informed` DROP COLUMN `draftScore`,
    DROP COLUMN `finalScore`,
    ADD COLUMN `facultyScore` INTEGER NULL DEFAULT 0,
    ADD COLUMN `observerScore` INTEGER NULL DEFAULT 0,
    ADD COLUMN `savedScore` INTEGER NULL DEFAULT 0;
