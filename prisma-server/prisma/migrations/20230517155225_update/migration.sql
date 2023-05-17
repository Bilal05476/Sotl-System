/*
  Warnings:

  - Made the column `courseId` on table `Observations` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Observations` DROP FOREIGN KEY `Observations_courseId_fkey`;

-- AlterTable
ALTER TABLE `Observations` MODIFY `courseId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
