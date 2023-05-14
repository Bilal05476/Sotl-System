-- AlterTable
ALTER TABLE `ObsScheduling` ADD COLUMN `facultyAccepted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `observerAccepted` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `ObsReasons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reason` VARCHAR(191) NOT NULL,
    `senderId` INTEGER NULL,
    `receiverId` INTEGER NULL,
    `schedulingId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ObsReasons` ADD CONSTRAINT `ObsReasons_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsReasons` ADD CONSTRAINT `ObsReasons_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObsReasons` ADD CONSTRAINT `ObsReasons_schedulingId_fkey` FOREIGN KEY (`schedulingId`) REFERENCES `ObsScheduling`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
