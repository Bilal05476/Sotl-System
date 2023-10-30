/*
  Warnings:

  - You are about to drop the column `filename` on the `Artifact` table. All the data in the column will be lost.
  - You are about to drop the column `mimetype` on the `Artifact` table. All the data in the column will be lost.
  - Added the required column `fileURL` to the `Artifact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Artifact` DROP COLUMN `filename`,
    DROP COLUMN `mimetype`,
    ADD COLUMN `fileURL` VARCHAR(191) NOT NULL;
