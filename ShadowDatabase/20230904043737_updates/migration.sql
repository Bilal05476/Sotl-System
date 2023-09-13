/*
  Warnings:

  - You are about to drop the column `observerId` on the `Uninformed` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Uninformed` DROP FOREIGN KEY `Uninformed_observerId_fkey`;

-- AlterTable
ALTER TABLE `Uninformed` DROP COLUMN `observerId`;

-- CreateTable
CREATE TABLE `SystemTemplatePlan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('Teaching', 'Reflection', 'Artifacts') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SystemTemplatePlanStep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `SystemTemplatePlanId` INTEGER NULL,
    `field` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SystemTemplatePlanStep` ADD CONSTRAINT `SystemTemplatePlanStep_SystemTemplatePlanId_fkey` FOREIGN KEY (`SystemTemplatePlanId`) REFERENCES `SystemTemplatePlan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
