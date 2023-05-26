/*
  Warnings:

  - You are about to drop the column `filledById` on the `TemplatePlan` table. All the data in the column will be lost.
  - You are about to drop the column `schedulingRId` on the `TemplatePlan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `TemplatePlan` DROP FOREIGN KEY `TemplatePlan_filledById_fkey`;

-- DropForeignKey
ALTER TABLE `TemplatePlan` DROP FOREIGN KEY `TemplatePlan_schedulingRId_fkey`;

-- AlterTable
ALTER TABLE `TemplatePlan` DROP COLUMN `filledById`,
    DROP COLUMN `schedulingRId`,
    ADD COLUMN `assignedId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `TemplatePlan` ADD CONSTRAINT `TemplatePlan_assignedId_fkey` FOREIGN KEY (`assignedId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
