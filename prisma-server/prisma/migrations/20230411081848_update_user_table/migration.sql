/*
  Warnings:

  - You are about to drop the column `course` on the `observations` table. All the data in the column will be lost.
  - You are about to drop the `obsrequests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `obsrequests` DROP FOREIGN KEY `ObsRequests_observationsId_fkey`;

-- AlterTable
ALTER TABLE `observations` DROP COLUMN `course`,
    ADD COLUMN `courseId` INTEGER NULL;

-- DropTable
DROP TABLE `obsrequests`;

-- CreateTable
CREATE TABLE `ObsScheduling` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teachingPlanByFaculty` VARCHAR(191) NULL,
    `teachingPlanByObserver` VARCHAR(191) NULL,
    `refelectionPlanByFaculty` VARCHAR(191) NULL,
    `refelectionPlanByObserver` VARCHAR(191) NULL,
    `artifcats` VARCHAR(191) NULL,
    `timeSlotsByFaculty` JSON NULL,
    `timeSlotsByObserver` JSON NULL,
    `status` ENUM('Pending', 'Ongoing', 'Completed', 'Draft') NOT NULL DEFAULT 'Pending',
    `observationsId` INTEGER NOT NULL,
    `courseId` INTEGER NULL,

    UNIQUE INDEX `ObsScheduling_observationsId_key`(`observationsId`),
    UNIQUE INDEX `ObsScheduling_courseId_key`(`courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsScheduling` ADD CONSTRAINT `ObsScheduling_observationsId_fkey` FOREIGN KEY (`observationsId`) REFERENCES `Observations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsScheduling` ADD CONSTRAINT `ObsScheduling_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
