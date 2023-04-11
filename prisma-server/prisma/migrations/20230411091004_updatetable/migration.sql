/*
  Warnings:

  - A unique constraint covering the columns `[observationsId]` on the table `Meetings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseId]` on the table `Observations` will be added. If there are existing duplicate values, this will fail.
  - Made the column `meetingId` on table `informed` required. This step will fail if there are existing NULL values in that column.
  - Made the column `meetingId` on table `pdp` required. This step will fail if there are existing NULL values in that column.
  - Made the column `meetingId` on table `post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `meetingId` on table `uninformed` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `informed` DROP FOREIGN KEY `Informed_meetingId_fkey`;

-- DropForeignKey
ALTER TABLE `pdp` DROP FOREIGN KEY `PDP_meetingId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_meetingId_fkey`;

-- DropForeignKey
ALTER TABLE `uninformed` DROP FOREIGN KEY `Uninformed_meetingId_fkey`;

-- AlterTable
ALTER TABLE `informed` MODIFY `meetingId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pdp` MODIFY `meetingId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `post` MODIFY `meetingId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `uninformed` MODIFY `meetingId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Meetings_observationsId_key` ON `Meetings`(`observationsId`);

-- CreateIndex
CREATE UNIQUE INDEX `Observations_courseId_key` ON `Observations`(`courseId`);

-- AddForeignKey
ALTER TABLE `Informed` ADD CONSTRAINT `Informed_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Uninformed` ADD CONSTRAINT `Uninformed_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PDP` ADD CONSTRAINT `PDP_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
