/*
  Warnings:

  - You are about to drop the column `facultyDateId` on the `datetimes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `datetimes` DROP FOREIGN KEY `DateTimes_facultyDateId_fkey`;

-- AlterTable
ALTER TABLE `datetimes` DROP COLUMN `facultyDateId`;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `timeSlotByFaculty` DATETIME(3) NULL;
