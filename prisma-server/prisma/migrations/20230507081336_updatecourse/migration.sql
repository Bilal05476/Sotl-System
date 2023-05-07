/*
  Warnings:

  - Added the required column `credits` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Courses` ADD COLUMN `credits` INTEGER NOT NULL;
