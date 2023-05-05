/*
  Warnings:

  - You are about to drop the column `coursesId` on the `CourseSlots` table. All the data in the column will be lost.
  - You are about to drop the column `courseName` on the `Courses` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `CourseSlots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CourseSlots` DROP FOREIGN KEY `CourseSlots_coursesId_fkey`;

-- AlterTable
ALTER TABLE `CourseSlots` DROP COLUMN `coursesId`,
    ADD COLUMN `courseId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Courses` DROP COLUMN `courseName`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Observations` MODIFY `timeSlot` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `CourseSlots` ADD CONSTRAINT `CourseSlots_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
