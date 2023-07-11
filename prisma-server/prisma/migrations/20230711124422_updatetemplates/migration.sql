-- AlterTable
ALTER TABLE `TemplatePlan` ALTER COLUMN `type` DROP DEFAULT;

-- AlterTable
ALTER TABLE `TemplatePlanStep` ADD COLUMN `name` VARCHAR(191) NULL;
