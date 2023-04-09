/*
  Warnings:

  - You are about to drop the `delete` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `delete`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `designation` VARCHAR(191) NULL,
    `dateOfBirth` DATETIME(3) NULL,
    `institute` VARCHAR(191) NULL,
    `degree` VARCHAR(191) NULL,
    `starting` DATETIME(3) NULL,
    `ending` DATETIME(3) NULL,
    `role` ENUM('Admin', 'Campus_Director', 'Head_of_Department', 'Faculty', 'Observer') NOT NULL,
    `campus` ENUM('Main_Campus', 'Gulshan_Campus', 'North_Campus', 'Airport_Campus', 'Bahria_Campus', 'Islamabad_Campus') NOT NULL,
    `department` ENUM('Fest', 'Aifd', 'Media_Studies', 'Business', 'Education') NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Observations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `timeSlot` DATETIME(3) NULL,
    `observationStatus` ENUM('Pending', 'Ongoing', 'Completed', 'Draft') NOT NULL DEFAULT 'Pending',
    `observationProgress` INTEGER NOT NULL DEFAULT 0,
    `course` INTEGER NULL,
    `semester` VARCHAR(191) NOT NULL,
    `observationScore` INTEGER NOT NULL DEFAULT 0,
    `facultyId` INTEGER NOT NULL,
    `hodId` INTEGER NOT NULL,
    `observerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ObsRequests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teachingPlanByFaculty` VARCHAR(191) NULL,
    `teachingPlanByObserver` VARCHAR(191) NULL,
    `refelectionPlanByFaculty` VARCHAR(191) NULL,
    `refelectionPlanByObserver` VARCHAR(191) NULL,
    `artifcats` VARCHAR(191) NULL,
    `timeSlotsByFaculty` JSON NULL,
    `timeSlotsByObserver` JSON NULL,
    `obsReqStatus` ENUM('Pending', 'Ongoing', 'Completed', 'Draft') NOT NULL DEFAULT 'Pending',
    `courseByFaculty` INTEGER NULL,
    `observationsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Meetings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `observationsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Informed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `finalScore` INTEGER NOT NULL,
    `draftScore` INTEGER NOT NULL,
    `status` ENUM('Pending', 'Ongoing', 'Completed', 'Draft') NOT NULL DEFAULT 'Ongoing',
    `meetingId` INTEGER NULL,

    UNIQUE INDEX `Informed_meetingId_key`(`meetingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rubrics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rubricTitle` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rubric` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rubricText` VARCHAR(191) NOT NULL,
    `rubricScore` DOUBLE NOT NULL DEFAULT 0,
    `rubricsId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('Pending', 'Ongoing', 'Completed', 'Draft') NOT NULL DEFAULT 'Ongoing',
    `meetingId` INTEGER NULL,

    UNIQUE INDEX `Post_meetingId_key`(`meetingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Uninformed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('Pending', 'Ongoing', 'Completed', 'Draft') NOT NULL DEFAULT 'Ongoing',
    `meetingId` INTEGER NULL,

    UNIQUE INDEX `Uninformed_meetingId_key`(`meetingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PDP` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pdpDoc` VARCHAR(191) NOT NULL,
    `meetingId` INTEGER NULL,

    UNIQUE INDEX `PDP_meetingId_key`(`meetingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Courses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseName` VARCHAR(191) NOT NULL,
    `department` ENUM('Fest', 'Aifd', 'Media_Studies', 'Business', 'Education') NOT NULL,
    `campus` ENUM('Main_Campus', 'Gulshan_Campus', 'North_Campus', 'Airport_Campus', 'Bahria_Campus', 'Islamabad_Campus') NOT NULL,
    `observerId` INTEGER NULL,
    `facultyId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FeedBacks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment` VARCHAR(191) NOT NULL,
    `authorId` INTEGER NULL,
    `receiverId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Messages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(191) NOT NULL,
    `senderId` INTEGER NULL,
    `receiverId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_hodId_fkey` FOREIGN KEY (`hodId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_observerId_fkey` FOREIGN KEY (`observerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsRequests` ADD CONSTRAINT `ObsRequests_observationsId_fkey` FOREIGN KEY (`observationsId`) REFERENCES `Observations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meetings` ADD CONSTRAINT `Meetings_observationsId_fkey` FOREIGN KEY (`observationsId`) REFERENCES `Observations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Informed` ADD CONSTRAINT `Informed_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rubric` ADD CONSTRAINT `Rubric_rubricsId_fkey` FOREIGN KEY (`rubricsId`) REFERENCES `Rubrics`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Uninformed` ADD CONSTRAINT `Uninformed_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PDP` ADD CONSTRAINT `PDP_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_observerId_fkey` FOREIGN KEY (`observerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
