/*
  Warnings:

  - You are about to drop the column `timeSlotByObserver` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `timeSlotsByFaculty` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `timeSlotByObserver`,
    DROP COLUMN `timeSlotsByFaculty`;

-- CreateTable
CREATE TABLE `DateTimes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `_Observer` ADD CONSTRAINT `_Observer_A_fkey` FOREIGN KEY (`A`) REFERENCES `DateTimes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Observer` ADD CONSTRAINT `_Observer_B_fkey` FOREIGN KEY (`B`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Faculty` ADD CONSTRAINT `_Faculty_A_fkey` FOREIGN KEY (`A`) REFERENCES `DateTimes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Faculty` ADD CONSTRAINT `_Faculty_B_fkey` FOREIGN KEY (`B`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
