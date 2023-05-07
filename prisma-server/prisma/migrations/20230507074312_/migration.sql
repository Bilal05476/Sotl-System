/*
  Warnings:

  - The primary key for the `CourseSlots` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `depthElective` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `elective` on the `Courses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `CourseSlots` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Courses` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `CourseSlots` DROP FOREIGN KEY `CourseSlots_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Observations` DROP FOREIGN KEY `Observations_courseId_fkey`;

-- AlterTable
ALTER TABLE `CourseSlots` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL,
    MODIFY `courseId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Courses` DROP PRIMARY KEY,
    DROP COLUMN `depthElective`,
    DROP COLUMN `elective`,
    ADD COLUMN `isDepthElective` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isElective` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Observations` MODIFY `courseId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CourseSlots_id_key` ON `CourseSlots`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Courses_id_key` ON `Courses`(`id`);

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseSlots` ADD CONSTRAINT `CourseSlots_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
