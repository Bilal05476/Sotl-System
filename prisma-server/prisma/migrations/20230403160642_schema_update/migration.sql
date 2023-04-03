/*
  Warnings:

  - You are about to drop the column `userId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `observations` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `obsrequests` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `Courses_userId_fkey`;

-- DropForeignKey
ALTER TABLE `feedbacks` DROP FOREIGN KEY `FeedBacks_userId_fkey`;

-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `Messages_userId_fkey`;

-- DropForeignKey
ALTER TABLE `observations` DROP FOREIGN KEY `Observations_userId_fkey`;

-- DropForeignKey
ALTER TABLE `obsrequests` DROP FOREIGN KEY `ObsRequests_userId_fkey`;

-- AlterTable
ALTER TABLE `courses` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `feedbacks` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `messages` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `observations` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `obsrequests` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `courseIds` INTEGER NULL,
    ADD COLUMN `feedbackIds` INTEGER NULL,
    ADD COLUMN `messageIds` INTEGER NULL,
    ADD COLUMN `obsRequestIds` INTEGER NULL,
    ADD COLUMN `observationIds` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_observationIds_fkey` FOREIGN KEY (`observationIds`) REFERENCES `Observations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_obsRequestIds_fkey` FOREIGN KEY (`obsRequestIds`) REFERENCES `ObsRequests`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_courseIds_fkey` FOREIGN KEY (`courseIds`) REFERENCES `Courses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_feedbackIds_fkey` FOREIGN KEY (`feedbackIds`) REFERENCES `FeedBacks`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_messageIds_fkey` FOREIGN KEY (`messageIds`) REFERENCES `Messages`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
