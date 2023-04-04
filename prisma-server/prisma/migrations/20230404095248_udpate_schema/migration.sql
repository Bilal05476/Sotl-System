-- DropForeignKey
ALTER TABLE `meetings` DROP FOREIGN KEY `Meetings_observationId_fkey`;

-- AlterTable
ALTER TABLE `meetings` MODIFY `observationId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Meetings` ADD CONSTRAINT `Meetings_observationId_fkey` FOREIGN KEY (`observationId`) REFERENCES `Observations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
