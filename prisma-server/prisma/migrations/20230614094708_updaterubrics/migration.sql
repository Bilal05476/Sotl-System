-- DropForeignKey
ALTER TABLE `Rubric` DROP FOREIGN KEY `Rubric_informedId_fkey`;

-- AlterTable
ALTER TABLE `Rubric` MODIFY `informedId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Rubric` ADD CONSTRAINT `Rubric_informedId_fkey` FOREIGN KEY (`informedId`) REFERENCES `Informed`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
