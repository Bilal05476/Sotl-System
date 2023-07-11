/*
  Warnings:

  - You are about to drop the column `name` on the `TemplatePlanStep` table. All the data in the column will be lost.
  - Added the required column `timeSlotByObserver` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeSlotsByFaculty` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `facultyAccepted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `observerAccepted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `scheduledOn` DATETIME(3) NULL,
    ADD COLUMN `timeSlotByObserver` JSON NOT NULL,
    ADD COLUMN `timeSlotsByFaculty` JSON NOT NULL;

-- AlterTable
ALTER TABLE `TemplatePlan` ADD COLUMN `postObsReflectionId` INTEGER NULL;

-- AlterTable
ALTER TABLE `TemplatePlanStep` DROP COLUMN `name`;

-- AddForeignKey
ALTER TABLE `TemplatePlan` ADD CONSTRAINT `TemplatePlan_postObsReflectionId_fkey` FOREIGN KEY (`postObsReflectionId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
