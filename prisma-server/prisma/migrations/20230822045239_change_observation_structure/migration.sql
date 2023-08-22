/*
  Warnings:

  - You are about to drop the `PDP` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `observerId` to the `Uninformed` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `PDP` DROP FOREIGN KEY `PDP_meetingId_fkey`;

-- AlterTable
ALTER TABLE `Rubric` ADD COLUMN `uninformedId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Uninformed` ADD COLUMN `observerId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `PDP`;

-- CreateTable
CREATE TABLE `AfterObservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pdpDoc` VARCHAR(191) NOT NULL,
    `meetingId` INTEGER NOT NULL,
    `aggrScore` INTEGER NULL,

    UNIQUE INDEX `AfterObservation_meetingId_key`(`meetingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Rubric` ADD CONSTRAINT `Rubric_uninformedId_fkey` FOREIGN KEY (`uninformedId`) REFERENCES `Uninformed`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Uninformed` ADD CONSTRAINT `Uninformed_observerId_fkey` FOREIGN KEY (`observerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AfterObservation` ADD CONSTRAINT `AfterObservation_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
