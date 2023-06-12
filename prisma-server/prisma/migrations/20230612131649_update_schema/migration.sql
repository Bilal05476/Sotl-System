/*
  Warnings:

  - You are about to drop the column `facultyScore` on the `Informed` table. All the data in the column will be lost.
  - You are about to drop the column `observerScore` on the `Informed` table. All the data in the column will be lost.
  - You are about to drop the column `rubricId` on the `Rubric` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Rubric` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Rubric` table. All the data in the column will be lost.
  - You are about to drop the `Rubrics` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `facultyScore` to the `Rubric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `informedId` to the `Rubric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observerScore` to the `Rubric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Rubric` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Rubric` DROP FOREIGN KEY `Rubric_rubricId_fkey`;

-- AlterTable
ALTER TABLE `Informed` DROP COLUMN `facultyScore`,
    DROP COLUMN `observerScore`,
    ADD COLUMN `finalScore` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Rubric` DROP COLUMN `rubricId`,
    DROP COLUMN `score`,
    DROP COLUMN `text`,
    ADD COLUMN `facultyScore` INTEGER NOT NULL,
    ADD COLUMN `informedId` INTEGER NOT NULL,
    ADD COLUMN `observerScore` INTEGER NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Rubrics`;

-- AddForeignKey
ALTER TABLE `Rubric` ADD CONSTRAINT `Rubric_informedId_fkey` FOREIGN KEY (`informedId`) REFERENCES `Informed`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
