/*
  Warnings:

  - Added the required column `observationId` to the `ObsRequests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `obsrequests` ADD COLUMN `observationId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ObsRequests` ADD CONSTRAINT `ObsRequests_observationId_fkey` FOREIGN KEY (`observationId`) REFERENCES `Observations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
