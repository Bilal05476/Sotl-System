/*
  Warnings:

  - You are about to alter the column `meetingName` on the `meetings` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `meetings` MODIFY `meetingName` JSON NULL;
