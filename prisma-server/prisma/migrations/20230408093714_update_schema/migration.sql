/*
  Warnings:

  - You are about to drop the column `score` on the `informed` table. All the data in the column will be lost.
  - Added the required column `draftScore` to the `Informed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalScore` to the `Informed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `informed` DROP COLUMN `score`,
    ADD COLUMN `draftScore` INTEGER NOT NULL,
    ADD COLUMN `finalScore` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `InformedRubrics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rubricText` VARCHAR(191) NOT NULL,
    `rubricScore` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
