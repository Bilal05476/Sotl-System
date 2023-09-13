/*
  Warnings:

  - A unique constraint covering the columns `[obsSchedulingId]` on the table `TemplatePlan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postObsReflectionId]` on the table `TemplatePlan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Artifact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postId` INTEGER NULL,
    `filename` VARCHAR(191) NOT NULL,
    `mimeType` VARCHAR(191) NOT NULL,
    `data` LONGBLOB NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `TemplatePlan_obsSchedulingId_key` ON `TemplatePlan`(`obsSchedulingId`);

-- CreateIndex
CREATE UNIQUE INDEX `TemplatePlan_postObsReflectionId_key` ON `TemplatePlan`(`postObsReflectionId`);

-- AddForeignKey
ALTER TABLE `Artifact` ADD CONSTRAINT `Artifact_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
