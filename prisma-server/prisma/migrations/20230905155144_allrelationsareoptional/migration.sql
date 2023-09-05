-- DropForeignKey
ALTER TABLE `AfterObservation` DROP FOREIGN KEY `AfterObservation_meetingId_fkey`;

-- DropForeignKey
ALTER TABLE `CourseSlots` DROP FOREIGN KEY `CourseSlots_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `FeedBacks` DROP FOREIGN KEY `FeedBacks_observationId_fkey`;

-- DropForeignKey
ALTER TABLE `Informed` DROP FOREIGN KEY `Informed_meetingId_fkey`;

-- DropForeignKey
ALTER TABLE `Meetings` DROP FOREIGN KEY `Meetings_observationsId_fkey`;

-- DropForeignKey
ALTER TABLE `ObsScheduling` DROP FOREIGN KEY `ObsScheduling_observationsId_fkey`;

-- DropForeignKey
ALTER TABLE `Observations` DROP FOREIGN KEY `Observations_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `Observations` DROP FOREIGN KEY `Observations_hodId_fkey`;

-- DropForeignKey
ALTER TABLE `Observations` DROP FOREIGN KEY `Observations_observerId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_meetingId_fkey`;

-- DropForeignKey
ALTER TABLE `Uninformed` DROP FOREIGN KEY `Uninformed_meetingId_fkey`;

-- AlterTable
ALTER TABLE `AfterObservation` MODIFY `meetingId` INTEGER NULL;

-- AlterTable
ALTER TABLE `CourseSlots` MODIFY `courseId` INTEGER NULL;

-- AlterTable
ALTER TABLE `FeedBacks` MODIFY `observationId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Informed` MODIFY `meetingId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Meetings` MODIFY `observationsId` INTEGER NULL;

-- AlterTable
ALTER TABLE `ObsScheduling` MODIFY `observationsId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Observations` MODIFY `facultyId` INTEGER NULL,
    MODIFY `hodId` INTEGER NULL,
    MODIFY `observerId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Post` MODIFY `meetingId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Uninformed` MODIFY `meetingId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_hodId_fkey` FOREIGN KEY (`hodId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_observerId_fkey` FOREIGN KEY (`observerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsScheduling` ADD CONSTRAINT `ObsScheduling_observationsId_fkey` FOREIGN KEY (`observationsId`) REFERENCES `Observations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meetings` ADD CONSTRAINT `Meetings_observationsId_fkey` FOREIGN KEY (`observationsId`) REFERENCES `Observations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Informed` ADD CONSTRAINT `Informed_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Uninformed` ADD CONSTRAINT `Uninformed_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AfterObservation` ADD CONSTRAINT `AfterObservation_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseSlots` ADD CONSTRAINT `CourseSlots_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_observationId_fkey` FOREIGN KEY (`observationId`) REFERENCES `Observations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
