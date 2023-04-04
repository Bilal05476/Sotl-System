-- DropForeignKey
ALTER TABLE `feedbacks` DROP FOREIGN KEY `FeedBacks_ObserverId_fkey`;

-- DropForeignKey
ALTER TABLE `feedbacks` DROP FOREIGN KEY `FeedBacks_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `observations` DROP FOREIGN KEY `Observations_ObserverId_fkey`;

-- DropForeignKey
ALTER TABLE `observations` DROP FOREIGN KEY `Observations_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `observations` DROP FOREIGN KEY `Observations_hodId_fkey`;

-- DropForeignKey
ALTER TABLE `obsrequests` DROP FOREIGN KEY `ObsRequests_ObserverId_fkey`;

-- DropForeignKey
ALTER TABLE `obsrequests` DROP FOREIGN KEY `ObsRequests_facultyId_fkey`;

-- AlterTable
ALTER TABLE `feedbacks` MODIFY `ObserverId` INTEGER NULL,
    MODIFY `facultyId` INTEGER NULL;

-- AlterTable
ALTER TABLE `observations` MODIFY `ObserverId` INTEGER NULL,
    MODIFY `facultyId` INTEGER NULL,
    MODIFY `hodId` INTEGER NULL;

-- AlterTable
ALTER TABLE `obsrequests` MODIFY `ObserverId` INTEGER NULL,
    MODIFY `facultyId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ObsRequests` ADD CONSTRAINT `ObsRequests_ObserverId_fkey` FOREIGN KEY (`ObserverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsRequests` ADD CONSTRAINT `ObsRequests_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_hodId_fkey` FOREIGN KEY (`hodId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_ObserverId_fkey` FOREIGN KEY (`ObserverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_ObserverId_fkey` FOREIGN KEY (`ObserverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
