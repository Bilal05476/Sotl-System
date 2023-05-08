-- AlterTable
ALTER TABLE `ObsScheduling` MODIFY `status` ENUM('Pending', 'Ongoing', 'Completed', 'Draft') NOT NULL DEFAULT 'Ongoing';
