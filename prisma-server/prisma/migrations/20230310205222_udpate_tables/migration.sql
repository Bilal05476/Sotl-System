/*
  Warnings:

  - Added the required column `rubric` to the `Meetings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `meetings` ADD COLUMN `meetingName` VARCHAR(191) NOT NULL DEFAULT 'Pre-Obs',
    ADD COLUMN `meetingScore` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `rubric` LONGBLOB NOT NULL;

-- CreateTable
CREATE TABLE `FeedBacks` (
    `id` VARCHAR(191) NOT NULL,
    `meetingId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
