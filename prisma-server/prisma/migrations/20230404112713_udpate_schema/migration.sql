/*
  Warnings:

  - You are about to alter the column `teachingPlan` on the `obsrequests` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `obsrequests` MODIFY `teachingPlan` VARCHAR(191) NOT NULL;
