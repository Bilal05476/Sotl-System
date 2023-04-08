/*
  Warnings:

  - You are about to drop the column `ObsRequest` on the `observations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `observations` DROP COLUMN `ObsRequest`,
    ADD COLUMN `obsRequest` INTEGER NULL;
