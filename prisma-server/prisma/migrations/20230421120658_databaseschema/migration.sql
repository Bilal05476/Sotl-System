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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Observations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `timeSlot` JSON NULL,
    `observationStatus` ENUM('Pending', 'Ongoing', 'Completed', 'Draft') NOT NULL DEFAULT 'Pending',
    `observationProgress` INTEGER NOT NULL DEFAULT 0,
    `semester` VARCHAR(191) NOT NULL,
    `observationScore` INTEGER NOT NULL DEFAULT 0,
    `facultyId` INTEGER NOT NULL,
    `hodId` INTEGER NOT NULL,
    `observerId` INTEGER NOT NULL,
    `courseId` INTEGER NULL,

    UNIQUE INDEX `Observations_courseId_key`(`courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `courseName` VARCHAR(191) NOT NULL,
    `department` ENUM('Fest', 'Aifd', 'Media_Studies', 'Business', 'Education') NOT NULL,
    `campus` ENUM('Main_Campus', 'Gulshan_Campus', 'North_Campus', 'Airport_Campus', 'Bahria_Campus', 'Islamabad_Campus') NOT NULL,
    `timeSlot` VARCHAR(191) NULL,
    `room` VARCHAR(191) NULL,
    `day` VARCHAR(191) NULL,

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

-- CreateTable
CREATE TABLE `_Observer` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Observer_AB_unique`(`A`, `B`),
    INDEX `_Observer_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Faculty` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Faculty_AB_unique`(`A`, `B`),
    INDEX `_Faculty_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_hodId_fkey` FOREIGN KEY (`hodId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_observerId_fkey` FOREIGN KEY (`observerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsScheduling` ADD CONSTRAINT `ObsScheduling_observationsId_fkey` FOREIGN KEY (`observationsId`) REFERENCES `Observations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsScheduling` ADD CONSTRAINT `ObsScheduling_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Observer` ADD CONSTRAINT `_Observer_A_fkey` FOREIGN KEY (`A`) REFERENCES `Courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Observer` ADD CONSTRAINT `_Observer_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Faculty` ADD CONSTRAINT `_Faculty_A_fkey` FOREIGN KEY (`A`) REFERENCES `Courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Faculty` ADD CONSTRAINT `_Faculty_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
