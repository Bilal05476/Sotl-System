-- AlterTable
ALTER TABLE `Informed` MODIFY `status` ENUM('Pending', 'Ongoing', 'Completed', 'Draft', 'Scheduled') NOT NULL DEFAULT 'Ongoing';

-- AlterTable
ALTER TABLE `ObsScheduling` MODIFY `status` ENUM('Pending', 'Ongoing', 'Completed', 'Draft', 'Scheduled') NOT NULL DEFAULT 'Ongoing';

-- AlterTable
ALTER TABLE `Observations` MODIFY `observationStatus` ENUM('Pending', 'Ongoing', 'Completed', 'Draft', 'Scheduled') NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE `Post` MODIFY `status` ENUM('Pending', 'Ongoing', 'Completed', 'Draft', 'Scheduled') NOT NULL DEFAULT 'Ongoing';

-- AlterTable
ALTER TABLE `Uninformed` MODIFY `status` ENUM('Pending', 'Ongoing', 'Completed', 'Draft', 'Scheduled') NOT NULL DEFAULT 'Ongoing';
