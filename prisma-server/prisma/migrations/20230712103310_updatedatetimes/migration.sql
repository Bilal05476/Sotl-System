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
ALTER TABLE `DateTimes` ADD COLUMN `facultyDateId` INTEGER NULL,
    ADD COLUMN `observerDateId` INTEGER NULL;

-- DropTable
DROP TABLE `_Faculty`;

-- DropTable
DROP TABLE `_Observer`;

-- AddForeignKey
ALTER TABLE `DateTimes` ADD CONSTRAINT `DateTimes_observerDateId_fkey` FOREIGN KEY (`observerDateId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DateTimes` ADD CONSTRAINT `DateTimes_facultyDateId_fkey` FOREIGN KEY (`facultyDateId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
