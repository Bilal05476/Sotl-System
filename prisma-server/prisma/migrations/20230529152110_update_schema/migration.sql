/*
  Warnings:

  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Example`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `designation` VARCHAR(191) NULL,
    `dateOfBirth` VARCHAR(191) NULL,
    `institute` VARCHAR(191) NULL,
    `degree` VARCHAR(191) NULL,
    `starting` DATETIME(3) NULL,
    `ending` DATETIME(3) NULL,
    `role` ENUM('Super_Admin', 'Dean', 'Campus_Director', 'Head_of_Department', 'Faculty', 'Observer') NOT NULL,
    `campus` ENUM('Main_Campus', 'Gulshan_Campus', 'North_Campus', 'Airport_Campus', 'Bahria_Campus', 'Islamabad_Campus') NOT NULL,
    `department` ENUM('Computer_Science', 'Software_Engineering', 'Business_Accounting', 'Business_Adminitration', 'Animation', 'Film_and_TV') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Observations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `starting` DATETIME(3) NULL,
    `ending` DATETIME(3) NULL,
    `observationStatus` ENUM('Pending', 'Ongoing', 'Completed', 'Draft') NOT NULL DEFAULT 'Pending',
    `observationProgress` INTEGER NOT NULL DEFAULT 0,
    `semester` VARCHAR(191) NOT NULL,
    `observationScore` INTEGER NOT NULL DEFAULT 0,
    `facultyId` INTEGER NOT NULL,
    `hodId` INTEGER NOT NULL,
    `observerId` INTEGER NOT NULL,
    `courseId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ObsScheduling` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `scheduledOn` DATETIME(3) NULL,
    `status` ENUM('Pending', 'Ongoing', 'Completed', 'Draft') NOT NULL DEFAULT 'Ongoing',
    `observationsId` INTEGER NOT NULL,
    `facultyAccepted` BOOLEAN NOT NULL DEFAULT false,
    `observerAccepted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `ObsScheduling_observationsId_key`(`observationsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ObsReasons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reason` VARCHAR(191) NOT NULL,
    `senderId` INTEGER NULL,
    `receiverId` INTEGER NULL,
    `schedulingId` INTEGER NULL,
    `timeStamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Meetings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `observationsId` INTEGER NOT NULL,

    UNIQUE INDEX `Meetings_observationsId_key`(`observationsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Informed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `finalScore` INTEGER NULL DEFAULT 0,
    `draftScore` INTEGER NULL DEFAULT 0,
    `status` ENUM('Pending', 'Ongoing', 'Completed', 'Draft') NOT NULL DEFAULT 'Ongoing',
    `meetingId` INTEGER NOT NULL,

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
    `meetingId` INTEGER NOT NULL,

    UNIQUE INDEX `Post_meetingId_key`(`meetingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Uninformed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('Pending', 'Ongoing', 'Completed', 'Draft') NOT NULL DEFAULT 'Ongoing',
    `meetingId` INTEGER NOT NULL,

    UNIQUE INDEX `Uninformed_meetingId_key`(`meetingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PDP` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pdpDoc` VARCHAR(191) NOT NULL,
    `meetingId` INTEGER NOT NULL,

    UNIQUE INDEX `PDP_meetingId_key`(`meetingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Courses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseCode` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `department` ENUM('Computer_Science', 'Software_Engineering', 'Business_Accounting', 'Business_Adminitration', 'Animation', 'Film_and_TV') NOT NULL,
    `campus` ENUM('Main_Campus', 'Gulshan_Campus', 'North_Campus', 'Airport_Campus', 'Bahria_Campus', 'Islamabad_Campus') NOT NULL,
    `isElective` BOOLEAN NOT NULL DEFAULT false,
    `isDepthElective` BOOLEAN NOT NULL DEFAULT false,
    `credits` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CourseSlots` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sectionCode` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `day` VARCHAR(191) NOT NULL,
    `courseId` INTEGER NOT NULL,
    `facultyId` INTEGER NULL,
    `facultyobsId` INTEGER NULL,
    `observerObsId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FeedBacks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment` VARCHAR(191) NOT NULL,
    `authorId` INTEGER NULL,
    `receiverId` INTEGER NULL,
    `observationId` INTEGER NOT NULL,
    `timeStamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Messages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(191) NOT NULL,
    `senderId` INTEGER NULL,
    `receiverId` INTEGER NULL,
    `timeStamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TemplatePlan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('Teaching', 'Reflection', 'Artifacts') NOT NULL DEFAULT 'Teaching',
    `assignedId` INTEGER NULL,
    `editedById` INTEGER NULL,
    `obsSchedulingId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TemplatePlanStep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `field` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `response` VARCHAR(191) NULL,
    `templatePlanId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_hodId_fkey` FOREIGN KEY (`hodId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_observerId_fkey` FOREIGN KEY (`observerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsScheduling` ADD CONSTRAINT `ObsScheduling_observationsId_fkey` FOREIGN KEY (`observationsId`) REFERENCES `Observations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsReasons` ADD CONSTRAINT `ObsReasons_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsReasons` ADD CONSTRAINT `ObsReasons_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsReasons` ADD CONSTRAINT `ObsReasons_schedulingId_fkey` FOREIGN KEY (`schedulingId`) REFERENCES `ObsScheduling`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meetings` ADD CONSTRAINT `Meetings_observationsId_fkey` FOREIGN KEY (`observationsId`) REFERENCES `Observations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Informed` ADD CONSTRAINT `Informed_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rubric` ADD CONSTRAINT `Rubric_rubricsId_fkey` FOREIGN KEY (`rubricsId`) REFERENCES `Rubrics`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Uninformed` ADD CONSTRAINT `Uninformed_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PDP` ADD CONSTRAINT `PDP_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseSlots` ADD CONSTRAINT `CourseSlots_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseSlots` ADD CONSTRAINT `CourseSlots_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseSlots` ADD CONSTRAINT `CourseSlots_facultyobsId_fkey` FOREIGN KEY (`facultyobsId`) REFERENCES `ObsScheduling`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseSlots` ADD CONSTRAINT `CourseSlots_observerObsId_fkey` FOREIGN KEY (`observerObsId`) REFERENCES `ObsScheduling`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_observationId_fkey` FOREIGN KEY (`observationId`) REFERENCES `Observations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TemplatePlan` ADD CONSTRAINT `TemplatePlan_assignedId_fkey` FOREIGN KEY (`assignedId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TemplatePlan` ADD CONSTRAINT `TemplatePlan_editedById_fkey` FOREIGN KEY (`editedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TemplatePlan` ADD CONSTRAINT `TemplatePlan_obsSchedulingId_fkey` FOREIGN KEY (`obsSchedulingId`) REFERENCES `ObsScheduling`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TemplatePlanStep` ADD CONSTRAINT `TemplatePlanStep_templatePlanId_fkey` FOREIGN KEY (`templatePlanId`) REFERENCES `TemplatePlan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
