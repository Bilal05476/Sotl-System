/*
  Warnings:

  - You are about to drop the column `data` on the `Artifact` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `Artifact` table. All the data in the column will be lost.
  - Added the required column `filepath` to the `Artifact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Artifact` DROP COLUMN `data`,
    DROP COLUMN `mimeType`,
    ADD COLUMN `filepath` LONGBLOB NOT NULL;
