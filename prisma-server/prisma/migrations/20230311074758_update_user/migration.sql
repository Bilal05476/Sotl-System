/*
  Warnings:

  - Made the column `coursesId` on table `obsrequests` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `obsrequests` DROP FOREIGN KEY `ObsRequests_coursesId_fkey`;

-- AlterTable
ALTER TABLE `obsrequests` MODIFY `coursesId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `profDevPlan` LONGBLOB NULL;

-- AddForeignKey
ALTER TABLE `ObsRequests` ADD CONSTRAINT `ObsRequests_coursesId_fkey` FOREIGN KEY (`coursesId`) REFERENCES `Courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
