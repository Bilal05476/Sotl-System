/*
  Warnings:

  - You are about to alter the column `facultyScore` on the `Informed` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `observerScore` on the `Informed` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `facultyScore` on the `Rubric` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `observerScore` on the `Rubric` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Informed` MODIFY `facultyScore` DOUBLE NULL DEFAULT 0,
    MODIFY `observerScore` DOUBLE NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Rubric` MODIFY `facultyScore` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `observerScore` DOUBLE NOT NULL DEFAULT 0;
