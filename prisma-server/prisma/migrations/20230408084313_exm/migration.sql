/*
  Warnings:

  - You are about to drop the column `name` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `courses` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseName` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `campus` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `courses` DROP COLUMN `name`,
    ADD COLUMN `courseName` VARCHAR(191) NOT NULL,
    ADD COLUMN `department` ENUM('Fest', 'Aifd', 'Media', 'Business') NOT NULL,
    ADD COLUMN `facultyId` INTEGER NULL,
    ADD COLUMN `observerId` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `courses`,
    ADD COLUMN `avatar` VARCHAR(191) NULL,
    ADD COLUMN `campus` ENUM('Main_Campus', 'Gulshan_Campus', 'North_Campus', 'Airport_Campus', 'Bahria_Campus', 'Islamabad_Campus') NOT NULL,
    ADD COLUMN `dateOfBirth` DATETIME(3) NULL,
    ADD COLUMN `degree` VARCHAR(191) NULL,
    ADD COLUMN `department` ENUM('Fest', 'Aifd', 'Media', 'Business') NOT NULL,
    ADD COLUMN `designation` VARCHAR(191) NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `ending` DATETIME(3) NULL,
    ADD COLUMN `institute` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `role` ENUM('Admin', 'Campus_Director', 'Head_of_Department', 'Faculty', 'Observer') NOT NULL,
    ADD COLUMN `starting` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `ObsRequests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teachingPlanByFaculty` VARCHAR(191) NULL,
    `teachingPlanByObserver` VARCHAR(191) NULL,
    `refelectionPlanByFaculty` VARCHAR(191) NULL,
    `refelectionPlanByObserver` VARCHAR(191) NULL,
    `artifcats` VARCHAR(191) NULL,
    `timeSlot` JSON NULL,
    `observationRubric` VARCHAR(191) NULL,
    `observerId` INTEGER NULL,
    `facultyId` INTEGER NULL,
    `observationId` INTEGER NOT NULL,
    `obsReqStatus` ENUM('Pending', 'Ongoing', 'Completed') NOT NULL DEFAULT 'Pending',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Observations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `timeSlot` DATETIME(3) NULL,
    `observationStatus` ENUM('Pending', 'Ongoing', 'Completed') NOT NULL DEFAULT 'Pending',
    `observationProgress` INTEGER NOT NULL DEFAULT 0,
    `facultyId` INTEGER NULL,
    `hodId` INTEGER NULL,
    `observerId` INTEGER NULL,
    `courseId` INTEGER NULL,
    `semester` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Meetings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `informedObservationMeetingsId` INTEGER NOT NULL,
    `postObservationMeetingsId` INTEGER NOT NULL,
    `uninformedObservationMeetingsId` INTEGER NOT NULL,
    `pdpMeetingsId` INTEGER NOT NULL,
    `meetingScore` INTEGER NOT NULL DEFAULT 0,
    `rubric` LONGBLOB NULL,
    `profDevPlan` LONGBLOB NULL,
    `observationId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InformedObservationRubrics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rubricText` VARCHAR(191) NOT NULL,
    `rubricScore` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InformedObservationMeetings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `score` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostObservationMeetings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UninformedObservationMeetings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PdpMeetings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FeedBacks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `observerId` INTEGER NULL,
    `facultyId` INTEGER NULL,
    `informedObservationMeetingsId` INTEGER NOT NULL,
    `postObservationMeetingsId` INTEGER NOT NULL,
    `uninformedObservationMeetingsId` INTEGER NOT NULL,
    `pdpMeetingsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Messages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(191) NOT NULL,
    `observerId` INTEGER NULL,
    `facultyId` INTEGER NULL,
    `hodId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);

-- CreateIndex
CREATE INDEX `User_email_idx` ON `User`(`email`);

-- AddForeignKey
ALTER TABLE `ObsRequests` ADD CONSTRAINT `ObsRequests_observerId_fkey` FOREIGN KEY (`observerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsRequests` ADD CONSTRAINT `ObsRequests_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsRequests` ADD CONSTRAINT `ObsRequests_observationId_fkey` FOREIGN KEY (`observationId`) REFERENCES `Observations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_hodId_fkey` FOREIGN KEY (`hodId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_observerId_fkey` FOREIGN KEY (`observerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_observerId_fkey` FOREIGN KEY (`observerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meetings` ADD CONSTRAINT `Meetings_informedObservationMeetingsId_fkey` FOREIGN KEY (`informedObservationMeetingsId`) REFERENCES `InformedObservationMeetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meetings` ADD CONSTRAINT `Meetings_postObservationMeetingsId_fkey` FOREIGN KEY (`postObservationMeetingsId`) REFERENCES `PostObservationMeetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meetings` ADD CONSTRAINT `Meetings_uninformedObservationMeetingsId_fkey` FOREIGN KEY (`uninformedObservationMeetingsId`) REFERENCES `UninformedObservationMeetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meetings` ADD CONSTRAINT `Meetings_pdpMeetingsId_fkey` FOREIGN KEY (`pdpMeetingsId`) REFERENCES `PdpMeetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meetings` ADD CONSTRAINT `Meetings_observationId_fkey` FOREIGN KEY (`observationId`) REFERENCES `Observations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_observerId_fkey` FOREIGN KEY (`observerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_informedObservationMeetingsId_fkey` FOREIGN KEY (`informedObservationMeetingsId`) REFERENCES `InformedObservationMeetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_postObservationMeetingsId_fkey` FOREIGN KEY (`postObservationMeetingsId`) REFERENCES `PostObservationMeetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_uninformedObservationMeetingsId_fkey` FOREIGN KEY (`uninformedObservationMeetingsId`) REFERENCES `UninformedObservationMeetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_pdpMeetingsId_fkey` FOREIGN KEY (`pdpMeetingsId`) REFERENCES `PdpMeetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_observerId_fkey` FOREIGN KEY (`observerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_hodId_fkey` FOREIGN KEY (`hodId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
