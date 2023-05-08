/*
  Warnings:

  - You are about to drop the `_Faculty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Observer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_Faculty` DROP FOREIGN KEY `_Faculty_A_fkey`;

-- DropForeignKey
ALTER TABLE `_Faculty` DROP FOREIGN KEY `_Faculty_B_fkey`;

-- DropForeignKey
ALTER TABLE `_Observer` DROP FOREIGN KEY `_Observer_A_fkey`;

-- DropForeignKey
ALTER TABLE `_Observer` DROP FOREIGN KEY `_Observer_B_fkey`;

-- AlterTable
ALTER TABLE `CourseSlots` ADD COLUMN `slotFacultyId` INTEGER NULL,
    ADD COLUMN `slotObserverId` INTEGER NULL;

-- DropTable
DROP TABLE `_Faculty`;

-- DropTable
DROP TABLE `_Observer`;

-- AddForeignKey
ALTER TABLE `CourseSlots` ADD CONSTRAINT `CourseSlots_slotFacultyId_fkey` FOREIGN KEY (`slotFacultyId`) REFERENCES `ObsScheduling`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseSlots` ADD CONSTRAINT `CourseSlots_slotObserverId_fkey` FOREIGN KEY (`slotObserverId`) REFERENCES `ObsScheduling`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
