/*
  Warnings:

  - You are about to drop the column `artifcats` on the `ObsScheduling` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ObsScheduling` DROP COLUMN `artifcats`,
    ADD COLUMN `artifacts` VARCHAR(191) NULL;
