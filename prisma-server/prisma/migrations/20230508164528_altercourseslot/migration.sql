/*
  Warnings:

  - You are about to drop the column `slotFacultyId` on the `CourseSlots` table. All the data in the column will be lost.
  - You are about to drop the column `slotObserverId` on the `CourseSlots` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `CourseSlots` DROP FOREIGN KEY `CourseSlots_slotFacultyId_fkey`;

-- DropForeignKey
ALTER TABLE `CourseSlots` DROP FOREIGN KEY `CourseSlots_slotObserverId_fkey`;

-- AlterTable
ALTER TABLE `CourseSlots` DROP COLUMN `slotFacultyId`,
    DROP COLUMN `slotObserverId`;

-- CreateTable
CREATE TABLE `_Faculty` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Faculty_AB_unique`(`A`, `B`),
    INDEX `_Faculty_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Observer` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Observer_AB_unique`(`A`, `B`),
    INDEX `_Observer_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_Faculty` ADD CONSTRAINT `_Faculty_A_fkey` FOREIGN KEY (`A`) REFERENCES `CourseSlots`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Faculty` ADD CONSTRAINT `_Faculty_B_fkey` FOREIGN KEY (`B`) REFERENCES `ObsScheduling`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Observer` ADD CONSTRAINT `_Observer_A_fkey` FOREIGN KEY (`A`) REFERENCES `CourseSlots`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Observer` ADD CONSTRAINT `_Observer_B_fkey` FOREIGN KEY (`B`) REFERENCES `ObsScheduling`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
