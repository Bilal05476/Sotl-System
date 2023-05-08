/*
  Warnings:

  - You are about to drop the column `timeSlotsByObserver` on the `ObsScheduling` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ObsScheduling` DROP COLUMN `timeSlotsByObserver`,
    ADD COLUMN `scheduledOn` VARCHAR(191) NULL,
    ADD COLUMN `timeSlotByObserver` JSON NULL;
