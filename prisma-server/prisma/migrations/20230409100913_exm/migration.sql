-- AlterTable
ALTER TABLE `informed` MODIFY `status` ENUM('Pending', 'Ongoing', 'Completed', 'Draft') NOT NULL DEFAULT 'Ongoing';

-- AlterTable
ALTER TABLE `observations` ADD COLUMN `users` JSON NULL,
    MODIFY `observationStatus` ENUM('Pending', 'Ongoing', 'Completed', 'Draft') NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE `obsrequests` MODIFY `obsReqStatus` ENUM('Pending', 'Ongoing', 'Completed', 'Draft') NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE `post` MODIFY `status` ENUM('Pending', 'Ongoing', 'Completed', 'Draft') NOT NULL DEFAULT 'Ongoing';

-- AlterTable
ALTER TABLE `uninformed` MODIFY `status` ENUM('Pending', 'Ongoing', 'Completed', 'Draft') NOT NULL DEFAULT 'Ongoing';

-- CreateTable
CREATE TABLE `Person` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Film` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `producerId` INTEGER NULL,
    `directorId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Film` ADD CONSTRAINT `Film_producerId_fkey` FOREIGN KEY (`producerId`) REFERENCES `Person`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Film` ADD CONSTRAINT `Film_directorId_fkey` FOREIGN KEY (`directorId`) REFERENCES `Person`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
