/*
  Warnings:

  - You are about to drop the column `schedulingTId` on the `TemplatePlan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[templatePlanId]` on the table `ObsScheduling` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `TemplatePlan` DROP FOREIGN KEY `TemplatePlan_schedulingTId_fkey`;

-- AlterTable
ALTER TABLE `ObsScheduling` ADD COLUMN `templatePlanId` INTEGER NULL;

-- AlterTable
ALTER TABLE `TemplatePlan` DROP COLUMN `schedulingTId`;

-- CreateIndex
CREATE UNIQUE INDEX `ObsScheduling_templatePlanId_key` ON `ObsScheduling`(`templatePlanId`);

-- AddForeignKey
ALTER TABLE `ObsScheduling` ADD CONSTRAINT `ObsScheduling_templatePlanId_fkey` FOREIGN KEY (`templatePlanId`) REFERENCES `TemplatePlan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
