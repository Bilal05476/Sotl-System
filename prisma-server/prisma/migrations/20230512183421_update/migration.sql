/*
  Warnings:

  - You are about to drop the column `slotFacultyId` on the `CourseSlots` table. All the data in the column will be lost.
  - You are about to drop the column `slotObserverId` on the `CourseSlots` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `CourseSlots` DROP FOREIGN KEY `CourseSlots_slotFacultyId_fkey`;

-- DropForeignKey
ALTER TABLE `CourseSlots` DROP FOREIGN KEY `CourseSlots_slotObserverId_fkey`;

-- AlterTable
ALTER TABLE `CourseSlots` DROP COLUMN `slotFacultyId`,
    DROP COLUMN `slotObserverId`,
    ADD COLUMN `facultyobsId` INTEGER NULL,
    ADD COLUMN `observerObsId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `CourseSlots` ADD CONSTRAINT `CourseSlots_facultyobsId_fkey` FOREIGN KEY (`facultyobsId`) REFERENCES `ObsScheduling`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseSlots` ADD CONSTRAINT `CourseSlots_observerObsId_fkey` FOREIGN KEY (`observerObsId`) REFERENCES `ObsScheduling`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
