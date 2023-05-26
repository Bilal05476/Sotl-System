/*
  Warnings:

  - You are about to drop the column `templatePlanId` on the `ObsScheduling` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ObsScheduling` DROP FOREIGN KEY `ObsScheduling_templatePlanId_fkey`;

-- AlterTable
ALTER TABLE `ObsScheduling` DROP COLUMN `templatePlanId`;

-- AlterTable
ALTER TABLE `TemplatePlan` ADD COLUMN `obsSchedulingId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `TemplatePlan` ADD CONSTRAINT `TemplatePlan_obsSchedulingId_fkey` FOREIGN KEY (`obsSchedulingId`) REFERENCES `ObsScheduling`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
