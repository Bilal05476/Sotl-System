/*
  Warnings:

  - The primary key for the `CourseSlots` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `CourseSlots` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `courseId` on the `CourseSlots` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Courses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `courseId` on the `Observations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `sectionCode` to the `CourseSlots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseCode` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CourseSlots` DROP FOREIGN KEY `CourseSlots_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Observations` DROP FOREIGN KEY `Observations_courseId_fkey`;

-- AlterTable
ALTER TABLE `CourseSlots` DROP PRIMARY KEY,
    ADD COLUMN `sectionCode` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `courseId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Courses` DROP PRIMARY KEY,
    ADD COLUMN `courseCode` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Observations` MODIFY `courseId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseSlots` ADD CONSTRAINT `CourseSlots_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
