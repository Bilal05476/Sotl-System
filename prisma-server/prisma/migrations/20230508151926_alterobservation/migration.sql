/*
  Warnings:

  - You are about to drop the column `timeSlot` on the `Observations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Observations` DROP COLUMN `timeSlot`,
    ADD COLUMN `ending` VARCHAR(191) NULL,
    ADD COLUMN `starting` VARCHAR(191) NULL;
