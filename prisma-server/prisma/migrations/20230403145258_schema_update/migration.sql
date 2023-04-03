/*
  Warnings:

  - You are about to drop the column `facultyId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `hodId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `meetingId` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `observationsId` on the `meetings` table. All the data in the column will be lost.
  - You are about to drop the column `coursesId` on the `observations` table. All the data in the column will be lost.
  - You are about to drop the column `facultyId` on the `observations` table. All the data in the column will be lost.
  - You are about to drop the column `hodId` on the `observations` table. All the data in the column will be lost.
  - You are about to drop the column `observerId` on the `observations` table. All the data in the column will be lost.
  - You are about to drop the column `coursesId` on the `obsrequests` table. All the data in the column will be lost.
  - You are about to drop the column `facultyId` on the `obsrequests` table. All the data in the column will be lost.
  - You are about to drop the column `hodId` on the `obsrequests` table. All the data in the column will be lost.
  - You are about to drop the column `profDevPlan` on the `user` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meetingIds` to the `FeedBacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `FeedBacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observationIds` to the `Meetings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `Observations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Observations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `ObsRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ObsRequests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `Courses_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `Courses_hodId_fkey`;

-- DropForeignKey
ALTER TABLE `feedbacks` DROP FOREIGN KEY `FeedBacks_meetingId_fkey`;

-- DropForeignKey
ALTER TABLE `meetings` DROP FOREIGN KEY `Meetings_observationsId_fkey`;

-- DropForeignKey
ALTER TABLE `observations` DROP FOREIGN KEY `Observations_coursesId_fkey`;

-- DropForeignKey
ALTER TABLE `observations` DROP FOREIGN KEY `Observations_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `observations` DROP FOREIGN KEY `Observations_hodId_fkey`;

-- DropForeignKey
ALTER TABLE `observations` DROP FOREIGN KEY `Observations_observerId_fkey`;

-- DropForeignKey
ALTER TABLE `obsrequests` DROP FOREIGN KEY `ObsRequests_coursesId_fkey`;

-- DropForeignKey
ALTER TABLE `obsrequests` DROP FOREIGN KEY `ObsRequests_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `obsrequests` DROP FOREIGN KEY `ObsRequests_hodId_fkey`;

-- AlterTable
ALTER TABLE `courses` DROP COLUMN `facultyId`,
    DROP COLUMN `hodId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `feedbacks` DROP COLUMN `meetingId`,
    ADD COLUMN `meetingIds` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `meetings` DROP COLUMN `observationsId`,
    ADD COLUMN `observationIds` VARCHAR(191) NOT NULL,
    ADD COLUMN `profDevPlan` LONGBLOB NULL,
    MODIFY `rubric` LONGBLOB NULL;

-- AlterTable
ALTER TABLE `observations` DROP COLUMN `coursesId`,
    DROP COLUMN `facultyId`,
    DROP COLUMN `hodId`,
    DROP COLUMN `observerId`,
    ADD COLUMN `courseId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `obsrequests` DROP COLUMN `coursesId`,
    DROP COLUMN `facultyId`,
    DROP COLUMN `hodId`,
    ADD COLUMN `courseId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `profDevPlan`;

-- CreateTable
CREATE TABLE `Messages` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ObsRequests` ADD CONSTRAINT `ObsRequests_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsRequests` ADD CONSTRAINT `ObsRequests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meetings` ADD CONSTRAINT `Meetings_observationIds_fkey` FOREIGN KEY (`observationIds`) REFERENCES `Observations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_meetingIds_fkey` FOREIGN KEY (`meetingIds`) REFERENCES `Meetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
