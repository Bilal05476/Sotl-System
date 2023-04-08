/*
  Warnings:

  - You are about to drop the `courses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `feedbacks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `informedobservationmeetings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `informedobservationrubrics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `meetings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `observations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `obsrequests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pdpmeetings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `postobservationmeetings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `uninformedobservationmeetings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `Courses_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `Courses_observerId_fkey`;

-- DropForeignKey
ALTER TABLE `feedbacks` DROP FOREIGN KEY `FeedBacks_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `feedbacks` DROP FOREIGN KEY `FeedBacks_informedObservationMeetingsId_fkey`;

-- DropForeignKey
ALTER TABLE `feedbacks` DROP FOREIGN KEY `FeedBacks_observerId_fkey`;

-- DropForeignKey
ALTER TABLE `feedbacks` DROP FOREIGN KEY `FeedBacks_pdpMeetingsId_fkey`;

-- DropForeignKey
ALTER TABLE `feedbacks` DROP FOREIGN KEY `FeedBacks_postObservationMeetingsId_fkey`;

-- DropForeignKey
ALTER TABLE `feedbacks` DROP FOREIGN KEY `FeedBacks_uninformedObservationMeetingsId_fkey`;

-- DropForeignKey
ALTER TABLE `meetings` DROP FOREIGN KEY `Meetings_informedObservationMeetingsId_fkey`;

-- DropForeignKey
ALTER TABLE `meetings` DROP FOREIGN KEY `Meetings_observationId_fkey`;

-- DropForeignKey
ALTER TABLE `meetings` DROP FOREIGN KEY `Meetings_pdpMeetingsId_fkey`;

-- DropForeignKey
ALTER TABLE `meetings` DROP FOREIGN KEY `Meetings_postObservationMeetingsId_fkey`;

-- DropForeignKey
ALTER TABLE `meetings` DROP FOREIGN KEY `Meetings_uninformedObservationMeetingsId_fkey`;

-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `Messages_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `Messages_hodId_fkey`;

-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `Messages_observerId_fkey`;

-- DropForeignKey
ALTER TABLE `observations` DROP FOREIGN KEY `Observations_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `observations` DROP FOREIGN KEY `Observations_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `observations` DROP FOREIGN KEY `Observations_hodId_fkey`;

-- DropForeignKey
ALTER TABLE `observations` DROP FOREIGN KEY `Observations_observerId_fkey`;

-- DropForeignKey
ALTER TABLE `obsrequests` DROP FOREIGN KEY `ObsRequests_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `obsrequests` DROP FOREIGN KEY `ObsRequests_observationId_fkey`;

-- DropForeignKey
ALTER TABLE `obsrequests` DROP FOREIGN KEY `ObsRequests_observerId_fkey`;

-- DropIndex
DROP INDEX `User_email_idx` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `courses` JSON NULL,
    ADD COLUMN `feebbacks` JSON NULL,
    ADD COLUMN `messages` JSON NULL,
    ADD COLUMN `observations` JSON NULL;

-- DropTable
DROP TABLE `courses`;

-- DropTable
DROP TABLE `feedbacks`;

-- DropTable
DROP TABLE `informedobservationmeetings`;

-- DropTable
DROP TABLE `informedobservationrubrics`;

-- DropTable
DROP TABLE `meetings`;

-- DropTable
DROP TABLE `messages`;

-- DropTable
DROP TABLE `observations`;

-- DropTable
DROP TABLE `obsrequests`;

-- DropTable
DROP TABLE `pdpmeetings`;

-- DropTable
DROP TABLE `postobservationmeetings`;

-- DropTable
DROP TABLE `uninformedobservationmeetings`;
