/*
  Warnings:

  - You are about to drop the column `day` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `room` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `timeSlot` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `ObsScheduling` table. All the data in the column will be lost.
  - You are about to drop the `_Faculty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Observer` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `depthElective` on table `Courses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `elective` on table `Courses` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `observationId` to the `FeedBacks` table without a default value. This is not possible if the table is not empty.
  - Made the column `courseId` on table `Observations` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `ObsScheduling` DROP FOREIGN KEY `ObsScheduling_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Observations` DROP FOREIGN KEY `Observations_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `_Faculty` DROP FOREIGN KEY `_Faculty_A_fkey`;

-- DropForeignKey
ALTER TABLE `_Faculty` DROP FOREIGN KEY `_Faculty_B_fkey`;

-- DropForeignKey
ALTER TABLE `_Observer` DROP FOREIGN KEY `_Observer_A_fkey`;

-- DropForeignKey
ALTER TABLE `_Observer` DROP FOREIGN KEY `_Observer_B_fkey`;

-- AlterTable
ALTER TABLE `Courses` DROP COLUMN `day`,
    DROP COLUMN `room`,
    DROP COLUMN `timeSlot`,
    MODIFY `depthElective` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `elective` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `FeedBacks` ADD COLUMN `observationId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ObsScheduling` DROP COLUMN `courseId`;

-- AlterTable
ALTER TABLE `Observations` MODIFY `courseId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_Faculty`;

-- DropTable
DROP TABLE `_Observer`;

-- CreateTable
CREATE TABLE `CourseSlots` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `day` VARCHAR(191) NOT NULL,
    `coursesId` INTEGER NULL,
    `facultyId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseSlots` ADD CONSTRAINT `CourseSlots_coursesId_fkey` FOREIGN KEY (`coursesId`) REFERENCES `Courses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseSlots` ADD CONSTRAINT `CourseSlots_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBacks` ADD CONSTRAINT `FeedBacks_observationId_fkey` FOREIGN KEY (`observationId`) REFERENCES `Observations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
