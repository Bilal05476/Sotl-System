/*
  Warnings:

  - You are about to alter the column `filepath` on the `Artifact` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Artifact` MODIFY `filepath` VARCHAR(191) NOT NULL;
