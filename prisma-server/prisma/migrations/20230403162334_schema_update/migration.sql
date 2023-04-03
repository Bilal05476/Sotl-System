/*
  Warnings:

  - You are about to drop the column `meetingIds` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `observationIds` on the `meetings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `feedbacks` DROP FOREIGN KEY `FeedBacks_meetingIds_fkey`;

-- DropForeignKey
ALTER TABLE `meetings` DROP FOREIGN KEY `Meetings_observationIds_fkey`;

-- AlterTable
ALTER TABLE `feedbacks` DROP COLUMN `meetingIds`;

-- AlterTable
ALTER TABLE `meetings` DROP COLUMN `observationIds`,
    ADD COLUMN `feedbackIds` INTEGER NULL;

-- AlterTable
ALTER TABLE `observations` ADD COLUMN `meetingIds` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_meetingIds_fkey` FOREIGN KEY (`meetingIds`) REFERENCES `Meetings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meetings` ADD CONSTRAINT `Meetings_feedbackIds_fkey` FOREIGN KEY (`feedbackIds`) REFERENCES `FeedBacks`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
