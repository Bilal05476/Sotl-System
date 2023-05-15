-- DropForeignKey
ALTER TABLE `Observations` DROP FOREIGN KEY `Observations_courseId_fkey`;

-- AlterTable
ALTER TABLE `Observations` MODIFY `courseId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
