-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
    `institute` VARCHAR(191) NOT NULL,
    `degree` VARCHAR(191) NOT NULL,
    `starting` DATETIME(3) NOT NULL,
    `ending` DATETIME(3) NULL,
    `role` ENUM('ADMIN', 'CAMPUSDIRECTOR', 'HOD', 'FACULTY', 'OBSERVER') NOT NULL,
    `campus` ENUM('MAINCAMPUS', 'GULSHAN', 'NORTH', 'AIRPORT', 'BAHRIA', 'ISLAMABAD') NOT NULL,
    `department` ENUM('FEST', 'AIFD', 'MEDIA', 'BUSINESS') NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
