/*
  Warnings:

  - The values [Artifacts] on the enum `SystemTemplatePlan_type` will be removed. If these variants are still used in the database, this will fail.
  - The values [Artifacts] on the enum `SystemTemplatePlan_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `SystemTemplatePlan` MODIFY `type` ENUM('Teaching', 'Reflection') NOT NULL;

-- AlterTable
ALTER TABLE `TemplatePlan` MODIFY `type` ENUM('Teaching', 'Reflection') NOT NULL;

-- CreateTable
CREATE TABLE `EmailTemplate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `type` ENUM('CreateUser', 'InitiateObs', 'UpdateObs', 'ObsPrompt') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
