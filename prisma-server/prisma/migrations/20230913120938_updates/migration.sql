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
    `specialization` ENUM('Fest', 'BBA', 'Media_Studies') NULL,
    `departmentId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Observations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `starting` DATETIME(3) NULL,
    `ending` DATETIME(3) NULL,
    `observationStatus` ENUM('Pending', 'Ongoing', 'Completed', 'Draft', 'Scheduled') NOT NULL DEFAULT 'Pending',
    `observationProgress` INTEGER NOT NULL DEFAULT 0,
    `semester` VARCHAR(191) NOT NULL,
    `observationScore` INTEGER NOT NULL DEFAULT 0,
    `facultyId` INTEGER NULL,
    `hodId` INTEGER NULL,
    `observerId` INTEGER NULL,
    `courseId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `threshold` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ObsScheduling` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `scheduledOn` DATETIME(3) NULL,
    `status` ENUM('Pending', 'Ongoing', 'Completed', 'Draft', 'Scheduled') NOT NULL DEFAULT 'Ongoing',
    `observationsId` INTEGER NULL,
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
    `observationsId` INTEGER NULL,

    UNIQUE INDEX `Meetings_observationsId_key`(`observationsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Informed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `observerScore` DOUBLE NULL DEFAULT 0,
    `facultyScore` DOUBLE NULL DEFAULT 0,
    `status` ENUM('Pending', 'Ongoing', 'Completed', 'Draft', 'Scheduled') NOT NULL DEFAULT 'Ongoing',
    `meetingId` INTEGER NULL,

    UNIQUE INDEX `Informed_meetingId_key`(`meetingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rubric` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(500) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `observerScore` DOUBLE NOT NULL DEFAULT 0,
    `facultyScore` DOUBLE NOT NULL DEFAULT 0,
    `informedId` INTEGER NULL,
    `uninformedId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('Pending', 'Ongoing', 'Completed', 'Draft', 'Scheduled') NOT NULL DEFAULT 'Ongoing',
    `facultyAccepted` BOOLEAN NOT NULL DEFAULT false,
    `observerAccepted` BOOLEAN NOT NULL DEFAULT false,
    `timeSlotByFaculty` DATETIME(3) NULL,
    `location` VARCHAR(191) NULL,
    `scheduledOn` DATETIME(3) NULL,
    `meetingId` INTEGER NULL,

    UNIQUE INDEX `Post_meetingId_key`(`meetingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artifact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postId` INTEGER NULL,
    `mimetype` VARCHAR(191) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Uninformed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `observerScore` DOUBLE NULL DEFAULT 0,
    `facultyScore` DOUBLE NULL DEFAULT 0,
    `status` ENUM('Pending', 'Ongoing', 'Completed', 'Draft', 'Scheduled') NOT NULL DEFAULT 'Ongoing',
    `meetingId` INTEGER NULL,

    UNIQUE INDEX `Uninformed_meetingId_key`(`meetingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AfterObservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pdpDoc` VARCHAR(191) NOT NULL,
    `meetingId` INTEGER NULL,
    `aggrScore` INTEGER NULL,

    UNIQUE INDEX `AfterObservation_meetingId_key`(`meetingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Courses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseCode` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
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
    `courseId` INTEGER NULL,
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
    `observationId` INTEGER NULL,
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
    `type` ENUM('Teaching', 'Reflection') NOT NULL,
    `assignedId` INTEGER NULL,
    `editedById` INTEGER NULL,
    `obsSchedulingId` INTEGER NULL,
    `postObsReflectionId` INTEGER NULL,

    UNIQUE INDEX `TemplatePlan_obsSchedulingId_key`(`obsSchedulingId`),
    UNIQUE INDEX `TemplatePlan_postObsReflectionId_key`(`postObsReflectionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TemplatePlanStep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `field` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `code` VARCHAR(191) NULL,
    `response` VARCHAR(500) NULL,
    `templatePlanId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SystemTemplatePlan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('Teaching', 'Reflection') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SystemTemplatePlanStep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `SystemTemplatePlanId` INTEGER NULL,
    `field` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmailTemplate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(500) NOT NULL,
    `type` ENUM('CreateUser', 'InitiateObs', 'UpdateObs', 'ObsPrompt') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ObservationThreshold` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `threshold` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DateTimes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dateTime` DATETIME(3) NOT NULL,
    `observerDateId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CoursesToDepartments` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CoursesToDepartments_AB_unique`(`A`, `B`),
    INDEX `_CoursesToDepartments_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Departments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_hodId_fkey` FOREIGN KEY (`hodId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_observerId_fkey` FOREIGN KEY (`observerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsScheduling` ADD CONSTRAINT `ObsScheduling_observationsId_fkey` FOREIGN KEY (`observationsId`) REFERENCES `Observations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsReasons` ADD CONSTRAINT `ObsReasons_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsReasons` ADD CONSTRAINT `ObsReasons_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsReasons` ADD CONSTRAINT `ObsReasons_schedulingId_fkey` FOREIGN KEY (`schedulingId`) REFERENCES `ObsScheduling`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meetings` ADD CONSTRAINT `Meetings_observationsId_fkey` FOREIGN KEY (`observationsId`) REFERENCES `Observations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Informed` ADD CONSTRAINT `Informed_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rubric` ADD CONSTRAINT `Rubric_informedId_fkey` FOREIGN KEY (`informedId`) REFERENCES `Informed`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rubric` ADD CONSTRAINT `Rubric_uninformedId_fkey` FOREIGN KEY (`uninformedId`) REFERENCES `Uninformed`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Artifact` ADD CONSTRAINT `Artifact_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Uninformed` ADD CONSTRAINT `Uninformed_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AfterObservation` ADD CONSTRAINT `AfterObservation_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseSlots` ADD CONSTRAINT `CourseSlots_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_observationId_fkey` FOREIGN KEY (`observationId`) REFERENCES `Observations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE `TemplatePlan` ADD CONSTRAINT `TemplatePlan_postObsReflectionId_fkey` FOREIGN KEY (`postObsReflectionId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TemplatePlanStep` ADD CONSTRAINT `TemplatePlanStep_templatePlanId_fkey` FOREIGN KEY (`templatePlanId`) REFERENCES `TemplatePlan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SystemTemplatePlanStep` ADD CONSTRAINT `SystemTemplatePlanStep_SystemTemplatePlanId_fkey` FOREIGN KEY (`SystemTemplatePlanId`) REFERENCES `SystemTemplatePlan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DateTimes` ADD CONSTRAINT `DateTimes_observerDateId_fkey` FOREIGN KEY (`observerDateId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CoursesToDepartments` ADD CONSTRAINT `_CoursesToDepartments_A_fkey` FOREIGN KEY (`A`) REFERENCES `Courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CoursesToDepartments` ADD CONSTRAINT `_CoursesToDepartments_B_fkey` FOREIGN KEY (`B`) REFERENCES `Departments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
