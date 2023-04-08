/*
  Warnings:

  - You are about to drop the column `observationScore` on the `obsrequests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `observations` ADD COLUMN `observationScore` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `obsrequests` DROP COLUMN `observationScore`;
