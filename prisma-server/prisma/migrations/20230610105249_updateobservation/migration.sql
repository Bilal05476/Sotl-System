/*
  Warnings:

  - You are about to drop the column `rubricScore` on the `Rubric` table. All the data in the column will be lost.
  - You are about to drop the column `rubricText` on the `Rubric` table. All the data in the column will be lost.
  - You are about to drop the column `rubricsId` on the `Rubric` table. All the data in the column will be lost.
  - You are about to drop the column `rubricTitle` on the `Rubrics` table. All the data in the column will be lost.
  - Added the required column `code` to the `Rubric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Rubric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Rubric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Rubrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Rubrics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Observations` DROP FOREIGN KEY `Observations_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Rubric` DROP FOREIGN KEY `Rubric_rubricsId_fkey`;

-- AlterTable
ALTER TABLE `Observations` MODIFY `courseId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Rubric` DROP COLUMN `rubricScore`,
    DROP COLUMN `rubricText`,
    DROP COLUMN `rubricsId`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `rubricId` INTEGER NULL,
    ADD COLUMN `score` INTEGER NOT NULL,
    ADD COLUMN `text` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Rubrics` DROP COLUMN `rubricTitle`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rubric` ADD CONSTRAINT `Rubric_rubricId_fkey` FOREIGN KEY (`rubricId`) REFERENCES `Rubrics`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
