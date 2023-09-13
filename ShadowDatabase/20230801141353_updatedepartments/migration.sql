/*
  Warnings:

  - You are about to drop the column `department` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Courses` DROP COLUMN `department`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `department`,
    ADD COLUMN `departmentId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Departments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CoursesToDepartments` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CoursesToDepartments_AB_unique`(`A`, `B`),
    INDEX `_CoursesToDepartments_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Departments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CoursesToDepartments` ADD CONSTRAINT `_CoursesToDepartments_A_fkey` FOREIGN KEY (`A`) REFERENCES `Courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CoursesToDepartments` ADD CONSTRAINT `_CoursesToDepartments_B_fkey` FOREIGN KEY (`B`) REFERENCES `Departments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
