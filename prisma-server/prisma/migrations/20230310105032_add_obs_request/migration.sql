-- CreateTable
CREATE TABLE `ObsRequest` (
    `id` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,
    `hodId` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `teachingPlan` VARCHAR(191) NOT NULL,
    `courseName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
