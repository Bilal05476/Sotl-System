/*
  Warnings:

  - The values [Fest,Aifd,Media_Studies,Business,Education] on the enum `Courses_department` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `artifacts` on the `ObsScheduling` table. All the data in the column will be lost.
  - You are about to drop the column `refelectionPlanByFaculty` on the `ObsScheduling` table. All the data in the column will be lost.
  - You are about to drop the column `refelectionPlanByObserver` on the `ObsScheduling` table. All the data in the column will be lost.
  - You are about to drop the column `teachingPlanByFaculty` on the `ObsScheduling` table. All the data in the column will be lost.
  - You are about to drop the column `teachingPlanByObserver` on the `ObsScheduling` table. All the data in the column will be lost.
  - The values [Admin] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - The values [Fest,Aifd,Media_Studies,Business,Education] on the enum `Courses_department` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Courses` MODIFY `department` ENUM('Computer_Science', 'Software_Engineering') NOT NULL;

-- AlterTable
ALTER TABLE `ObsScheduling` DROP COLUMN `artifacts`,
    DROP COLUMN `refelectionPlanByFaculty`,
    DROP COLUMN `refelectionPlanByObserver`,
    DROP COLUMN `teachingPlanByFaculty`,
    DROP COLUMN `teachingPlanByObserver`;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('Super_Admin', 'Dean', 'Campus_Director', 'Head_of_Department', 'Faculty', 'Observer') NOT NULL,
    MODIFY `department` ENUM('Computer_Science', 'Software_Engineering') NOT NULL;

-- CreateTable
CREATE TABLE `TemplatePlan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `field` VARCHAR(191) NOT NULL,
    `type` ENUM('Teaching', 'Reflection', 'Artifacts') NOT NULL DEFAULT 'Teaching',
    `filledById` INTEGER NULL,
    `editedById` INTEGER NULL,
    `schedulingTId` INTEGER NULL,
    `schedulingRId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TemplatePlan` ADD CONSTRAINT `TemplatePlan_filledById_fkey` FOREIGN KEY (`filledById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TemplatePlan` ADD CONSTRAINT `TemplatePlan_editedById_fkey` FOREIGN KEY (`editedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TemplatePlan` ADD CONSTRAINT `TemplatePlan_schedulingTId_fkey` FOREIGN KEY (`schedulingTId`) REFERENCES `ObsScheduling`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TemplatePlan` ADD CONSTRAINT `TemplatePlan_schedulingRId_fkey` FOREIGN KEY (`schedulingRId`) REFERENCES `ObsScheduling`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
