/*
  Warnings:

  - You are about to drop the column `observationRequestId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `observerationId` on the `courses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `Courses_observationRequestId_fkey`;

-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `Courses_observerationId_fkey`;

-- AlterTable
ALTER TABLE `courses` DROP COLUMN `observationRequestId`,
    DROP COLUMN `observerationId`;

-- AlterTable
ALTER TABLE `observations` ADD COLUMN `courseId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
