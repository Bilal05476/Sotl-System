/*
  Warnings:

  - You are about to drop the column `feebbacks` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `feebbacks`,
    ADD COLUMN `feedbacks` JSON NULL;
