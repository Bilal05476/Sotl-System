/*
  Warnings:

  - You are about to drop the column `location` on the `datetimes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `datetimes` DROP COLUMN `location`;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `location` VARCHAR(191) NULL;
