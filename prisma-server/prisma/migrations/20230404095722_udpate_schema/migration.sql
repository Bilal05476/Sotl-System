/*
  Warnings:

  - You are about to drop the column `ObserverId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `ObserverId` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `ObserverId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `ObserverId` on the `observations` table. All the data in the column will be lost.
  - You are about to drop the column `ObserverId` on the `obsrequests` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `Courses_ObserverId_fkey`;

-- DropForeignKey
ALTER TABLE `feedbacks` DROP FOREIGN KEY `FeedBacks_ObserverId_fkey`;

-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `Messages_ObserverId_fkey`;

-- DropForeignKey
ALTER TABLE `observations` DROP FOREIGN KEY `Observations_ObserverId_fkey`;

-- DropForeignKey
ALTER TABLE `obsrequests` DROP FOREIGN KEY `ObsRequests_ObserverId_fkey`;

-- AlterTable
ALTER TABLE `courses` DROP COLUMN `ObserverId`,
    ADD COLUMN `observerId` INTEGER NULL;

-- AlterTable
ALTER TABLE `feedbacks` DROP COLUMN `ObserverId`,
    ADD COLUMN `observerId` INTEGER NULL;

-- AlterTable
ALTER TABLE `messages` DROP COLUMN `ObserverId`,
    ADD COLUMN `observerId` INTEGER NULL;

-- AlterTable
ALTER TABLE `observations` DROP COLUMN `ObserverId`,
    ADD COLUMN `observerId` INTEGER NULL;

-- AlterTable
ALTER TABLE `obsrequests` DROP COLUMN `ObserverId`,
    ADD COLUMN `observerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ObsRequests` ADD CONSTRAINT `ObsRequests_observerId_fkey` FOREIGN KEY (`observerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_observerId_fkey` FOREIGN KEY (`observerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_observerId_fkey` FOREIGN KEY (`observerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_observerId_fkey` FOREIGN KEY (`observerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_observerId_fkey` FOREIGN KEY (`observerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
