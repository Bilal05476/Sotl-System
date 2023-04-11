/*
  Warnings:

  - You are about to drop the column `dateTime` on the `courses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `courses` DROP COLUMN `dateTime`,
    ADD COLUMN `day` VARCHAR(191) NULL,
    ADD COLUMN `timeSlot` VARCHAR(191) NULL;
