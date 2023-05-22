/*
  Warnings:

  - You are about to drop the column `field` on the `TemplatePlan` table. All the data in the column will be lost.
  - You are about to drop the column `response` on the `TemplatePlan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `TemplatePlan` DROP COLUMN `field`,
    DROP COLUMN `response`;

-- CreateTable
CREATE TABLE `TemplatePlanStep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `field` VARCHAR(191) NOT NULL,
    `response` VARCHAR(191) NULL,
    `templatePlanId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TemplatePlanStep` ADD CONSTRAINT `TemplatePlanStep_templatePlanId_fkey` FOREIGN KEY (`templatePlanId`) REFERENCES `TemplatePlan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
