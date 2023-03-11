/*
  Warnings:

  - You are about to drop the column `courseName` on the `obsrequests` table. All the data in the column will be lost.
  - Added the required column `courseName` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `courses` ADD COLUMN `courseName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `obsrequests` DROP COLUMN `courseName`,
    ADD COLUMN `coursesId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `ObsRequests` ADD CONSTRAINT `ObsRequests_coursesId_fkey` FOREIGN KEY (`coursesId`) REFERENCES `Courses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
