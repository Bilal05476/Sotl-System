/*
  Warnings:

  - You are about to drop the column `observationIds` on the `user` table. All the data in the column will be lost.
  - Added the required column `ObserverId` to the `Observations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facultyId` to the `Observations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hodId` to the `Observations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_observationIds_fkey`;

-- AlterTable
ALTER TABLE `observations` ADD COLUMN `ObserverId` INTEGER NOT NULL,
    ADD COLUMN `facultyId` INTEGER NOT NULL,
    ADD COLUMN `hodId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `observationIds`;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_hodId_fkey` FOREIGN KEY (`hodId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observations` ADD CONSTRAINT `Observations_ObserverId_fkey` FOREIGN KEY (`ObserverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
