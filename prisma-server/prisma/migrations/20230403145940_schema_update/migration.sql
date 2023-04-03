/*
  Warnings:

  - The primary key for the `courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `courses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - You are about to alter the column `userId` on the `courses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - The primary key for the `feedbacks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `feedbacks` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - You are about to alter the column `meetingIds` on the `feedbacks` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - You are about to alter the column `userId` on the `feedbacks` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - The primary key for the `meetings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `meetings` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - You are about to alter the column `observationIds` on the `meetings` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - The primary key for the `messages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `messages` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - You are about to alter the column `userId` on the `messages` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - The primary key for the `observations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `observations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - You are about to alter the column `courseId` on the `observations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - You are about to alter the column `userId` on the `observations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - The primary key for the `obsrequests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `obsrequests` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - You are about to alter the column `courseId` on the `obsrequests` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - You are about to alter the column `userId` on the `obsrequests` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.

*/
-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `Courses_userId_fkey`;

-- DropForeignKey
ALTER TABLE `feedbacks` DROP FOREIGN KEY `FeedBacks_meetingIds_fkey`;

-- DropForeignKey
ALTER TABLE `feedbacks` DROP FOREIGN KEY `FeedBacks_userId_fkey`;

-- DropForeignKey
ALTER TABLE `meetings` DROP FOREIGN KEY `Meetings_observationIds_fkey`;

-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `Messages_userId_fkey`;

-- DropForeignKey
ALTER TABLE `observations` DROP FOREIGN KEY `Observations_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `observations` DROP FOREIGN KEY `Observations_userId_fkey`;

-- DropForeignKey
ALTER TABLE `obsrequests` DROP FOREIGN KEY `ObsRequests_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `obsrequests` DROP FOREIGN KEY `ObsRequests_userId_fkey`;

-- AlterTable
ALTER TABLE `courses` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `userId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `feedbacks` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `meetingIds` BIGINT NOT NULL,
    MODIFY `userId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `meetings` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `observationIds` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `messages` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `userId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `observations` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `courseId` BIGINT NOT NULL,
    MODIFY `userId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `obsrequests` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `courseId` BIGINT NOT NULL,
    MODIFY `userId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

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
