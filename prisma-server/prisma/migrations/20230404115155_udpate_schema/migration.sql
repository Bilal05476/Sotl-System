/*
  Warnings:

  - Made the column `observationStatus` on table `observations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `observations` MODIFY `observationStatus` ENUM('Pending', 'Ongoing', 'Completed') NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE `obsrequests` ADD COLUMN `obsReqStatus` ENUM('Pending', 'Ongoing', 'Completed') NOT NULL DEFAULT 'Pending',
    MODIFY `teachingPlan` VARCHAR(191) NULL;
