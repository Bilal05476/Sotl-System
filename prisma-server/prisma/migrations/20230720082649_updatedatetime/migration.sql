/*
  Warnings:

  - You are about to drop the column `date` on the `datetimes` table. All the data in the column will be lost.
  - Added the required column `dateTime` to the `DateTimes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `DateTimes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `datetimes` DROP COLUMN `date`,
    ADD COLUMN `dateTime` DATETIME(3) NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL;
