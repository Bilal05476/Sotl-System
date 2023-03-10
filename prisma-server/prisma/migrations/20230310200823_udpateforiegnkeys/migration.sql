/*
  Warnings:

  - You are about to drop the `obsrequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `obsrequest`;

-- CreateTable
CREATE TABLE `ObsRequests` (
    `id` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,
    `hodId` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `teachingPlan` VARCHAR(191) NOT NULL,
    `courseName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ObsRequests` ADD CONSTRAINT `ObsRequests_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsRequests` ADD CONSTRAINT `ObsRequests_hodId_fkey` FOREIGN KEY (`hodId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
