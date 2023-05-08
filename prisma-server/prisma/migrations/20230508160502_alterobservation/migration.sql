/*
  Warnings:

  - You are about to drop the column `timeSlotByObserver` on the `ObsScheduling` table. All the data in the column will be lost.
  - You are about to drop the column `timeSlotsByFaculty` on the `ObsScheduling` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `CourseSlots` ADD COLUMN `slotFacultyId` INTEGER NULL,
    ADD COLUMN `slotObserverId` INTEGER NULL;

-- AlterTable
ALTER TABLE `ObsScheduling` DROP COLUMN `timeSlotByObserver`,
    DROP COLUMN `timeSlotsByFaculty`;

-- AddForeignKey
ALTER TABLE `CourseSlots` ADD CONSTRAINT `CourseSlots_slotFacultyId_fkey` FOREIGN KEY (`slotFacultyId`) REFERENCES `ObsScheduling`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseSlots` ADD CONSTRAINT `CourseSlots_slotObserverId_fkey` FOREIGN KEY (`slotObserverId`) REFERENCES `ObsScheduling`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
