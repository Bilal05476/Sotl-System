-- AlterTable
ALTER TABLE `user` MODIFY `dateOfBirth` DATETIME(3) NULL,
    MODIFY `institute` VARCHAR(191) NULL,
    MODIFY `degree` VARCHAR(191) NULL,
    MODIFY `starting` DATETIME(3) NULL;
