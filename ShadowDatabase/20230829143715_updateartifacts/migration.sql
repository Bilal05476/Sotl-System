/*
  Warnings:

  - You are about to drop the column `filepath` on the `Artifact` table. All the data in the column will be lost.
  - Added the required column `mimetype` to the `Artifact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Artifact` DROP COLUMN `filepath`,
    ADD COLUMN `mimetype` VARCHAR(191) NOT NULL;
