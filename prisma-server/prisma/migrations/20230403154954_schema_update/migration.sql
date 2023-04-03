-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `Courses_userId_fkey`;

-- DropForeignKey
ALTER TABLE `feedbacks` DROP FOREIGN KEY `FeedBacks_meetingIds_fkey`;

-- DropForeignKey
ALTER TABLE `meetings` DROP FOREIGN KEY `Meetings_observationIds_fkey`;

-- DropForeignKey
ALTER TABLE `observations` DROP FOREIGN KEY `Observations_courseId_fkey`;

-- AlterTable
ALTER TABLE `courses` MODIFY `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `feedbacks` MODIFY `meetingIds` INTEGER NULL;

-- AlterTable
ALTER TABLE `meetings` MODIFY `observationIds` INTEGER NULL;

-- AlterTable
ALTER TABLE `observations` MODIFY `courseId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meetings` ADD CONSTRAINT `Meetings_observationIds_fkey` FOREIGN KEY (`observationIds`) REFERENCES `Observations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_meetingIds_fkey` FOREIGN KEY (`meetingIds`) REFERENCES `Meetings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
