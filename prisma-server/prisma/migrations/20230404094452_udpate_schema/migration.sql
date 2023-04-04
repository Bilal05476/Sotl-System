/*
  Warnings:

  - You are about to drop the column `feedbackIds` on the `meetings` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `observations` table. All the data in the column will be lost.
  - You are about to drop the column `meetingIds` on the `observations` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `obsrequests` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `obsrequests` table. All the data in the column will be lost.
  - You are about to drop the column `courseIds` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `feedbackIds` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `messageIds` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `obsRequestIds` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[observerationId]` on the table `Courses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[observationRequestId]` on the table `Courses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ObserverId` to the `FeedBacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facultyId` to the `FeedBacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meetingId` to the `FeedBacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observationId` to the `Meetings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ObserverId` to the `ObsRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facultyId` to the `ObsRequests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `meetings` DROP FOREIGN KEY `Meetings_feedbackIds_fkey`;

-- DropForeignKey
ALTER TABLE `observations` DROP FOREIGN KEY `Observations_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `observations` DROP FOREIGN KEY `Observations_meetingIds_fkey`;

-- DropForeignKey
ALTER TABLE `obsrequests` DROP FOREIGN KEY `ObsRequests_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_courseIds_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_feedbackIds_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_messageIds_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_obsRequestIds_fkey`;

-- AlterTable
ALTER TABLE `courses` ADD COLUMN `ObserverId` INTEGER NULL,
    ADD COLUMN `facultyId` INTEGER NULL,
    ADD COLUMN `observationRequestId` INTEGER NULL,
    ADD COLUMN `observerationId` INTEGER NULL;

-- AlterTable
ALTER TABLE `feedbacks` ADD COLUMN `ObserverId` INTEGER NOT NULL,
    ADD COLUMN `facultyId` INTEGER NOT NULL,
    ADD COLUMN `meetingId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `meetings` DROP COLUMN `feedbackIds`,
    ADD COLUMN `observationId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `messages` ADD COLUMN `ObserverId` INTEGER NULL,
    ADD COLUMN `facultyId` INTEGER NULL,
    ADD COLUMN `hodId` INTEGER NULL;

-- AlterTable
ALTER TABLE `observations` DROP COLUMN `courseId`,
    DROP COLUMN `meetingIds`;

-- AlterTable
ALTER TABLE `obsrequests` DROP COLUMN `courseId`,
    DROP COLUMN `message`,
    ADD COLUMN `ObserverId` INTEGER NOT NULL,
    ADD COLUMN `facultyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `courseIds`,
    DROP COLUMN `feedbackIds`,
    DROP COLUMN `messageIds`,
    DROP COLUMN `obsRequestIds`;

-- CreateIndex
CREATE UNIQUE INDEX `Courses_observerationId_key` ON `Courses`(`observerationId`);

-- CreateIndex
CREATE UNIQUE INDEX `Courses_observationRequestId_key` ON `Courses`(`observationRequestId`);

-- AddForeignKey
ALTER TABLE `ObsRequests` ADD CONSTRAINT `ObsRequests_ObserverId_fkey` FOREIGN KEY (`ObserverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsRequests` ADD CONSTRAINT `ObsRequests_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_observerationId_fkey` FOREIGN KEY (`observerationId`) REFERENCES `Observations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_observationRequestId_fkey` FOREIGN KEY (`observationRequestId`) REFERENCES `ObsRequests`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_ObserverId_fkey` FOREIGN KEY (`ObserverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meetings` ADD CONSTRAINT `Meetings_observationId_fkey` FOREIGN KEY (`observationId`) REFERENCES `Observations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_ObserverId_fkey` FOREIGN KEY (`ObserverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_ObserverId_fkey` FOREIGN KEY (`ObserverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_hodId_fkey` FOREIGN KEY (`hodId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
