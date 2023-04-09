/*
  Warnings:

  - The `timeSlot` column on the `observations` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `observations` DROP COLUMN `timeSlot`,
    ADD COLUMN `timeSlot` JSON NULL;
