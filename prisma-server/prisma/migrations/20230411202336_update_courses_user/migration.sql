/*
  Warnings:

  - You are about to drop the column `facultyId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `observerId` on the `courses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `Courses_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `Courses_observerId_fkey`;

-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `courses` DROP COLUMN `facultyId`,
    DROP COLUMN `observerId`,
    ADD COLUMN `dateTime` VARCHAR(191) NULL,
    ADD COLUMN `room` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `_Observer` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Observer_AB_unique`(`A`, `B`),
    INDEX `_Observer_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Faculty` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Faculty_AB_unique`(`A`, `B`),
    INDEX `_Faculty_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_Observer` ADD CONSTRAINT `_Observer_A_fkey` FOREIGN KEY (`A`) REFERENCES `Courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Observer` ADD CONSTRAINT `_Observer_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Faculty` ADD CONSTRAINT `_Faculty_A_fkey` FOREIGN KEY (`A`) REFERENCES `Courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Faculty` ADD CONSTRAINT `_Faculty_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
