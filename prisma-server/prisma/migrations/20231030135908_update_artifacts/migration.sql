/*
  Warnings:

  - Added the required column `name` to the `Artifact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Artifact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Artifact` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
