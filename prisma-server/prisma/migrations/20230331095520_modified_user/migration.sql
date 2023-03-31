/*
  Warnings:

  - You are about to drop the `obsrequests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `obsrequests` DROP FOREIGN KEY `ObsRequests_coursesId_fkey`;

-- DropForeignKey
ALTER TABLE `obsrequests` DROP FOREIGN KEY `ObsRequests_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `obsrequests` DROP FOREIGN KEY `ObsRequests_hodId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `designation` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `obsrequests`;
