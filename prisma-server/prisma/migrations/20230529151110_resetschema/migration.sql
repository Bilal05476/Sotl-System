/*
  Warnings:

  - You are about to drop the `CourseSlots` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Courses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeedBacks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Informed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Meetings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ObsReasons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ObsScheduling` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Observations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PDP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rubric` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rubrics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TemplatePlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TemplatePlanStep` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Uninformed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CourseSlots` DROP FOREIGN KEY `CourseSlots_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `CourseSlots` DROP FOREIGN KEY `CourseSlots_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `CourseSlots` DROP FOREIGN KEY `CourseSlots_facultyobsId_fkey`;

-- DropForeignKey
ALTER TABLE `CourseSlots` DROP FOREIGN KEY `CourseSlots_observerObsId_fkey`;

-- DropForeignKey
ALTER TABLE `FeedBacks` DROP FOREIGN KEY `FeedBacks_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `FeedBacks` DROP FOREIGN KEY `FeedBacks_observationId_fkey`;

-- DropForeignKey
ALTER TABLE `FeedBacks` DROP FOREIGN KEY `FeedBacks_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `Informed` DROP FOREIGN KEY `Informed_meetingId_fkey`;

-- DropForeignKey
ALTER TABLE `Meetings` DROP FOREIGN KEY `Meetings_observationsId_fkey`;

-- DropForeignKey
ALTER TABLE `Messages` DROP FOREIGN KEY `Messages_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `Messages` DROP FOREIGN KEY `Messages_senderId_fkey`;

-- DropForeignKey
ALTER TABLE `ObsReasons` DROP FOREIGN KEY `ObsReasons_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `ObsReasons` DROP FOREIGN KEY `ObsReasons_schedulingId_fkey`;

-- DropForeignKey
ALTER TABLE `ObsReasons` DROP FOREIGN KEY `ObsReasons_senderId_fkey`;

-- DropForeignKey
ALTER TABLE `ObsScheduling` DROP FOREIGN KEY `ObsScheduling_observationsId_fkey`;

-- DropForeignKey
ALTER TABLE `Observations` DROP FOREIGN KEY `Observations_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Observations` DROP FOREIGN KEY `Observations_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `Observations` DROP FOREIGN KEY `Observations_hodId_fkey`;

-- DropForeignKey
ALTER TABLE `Observations` DROP FOREIGN KEY `Observations_observerId_fkey`;

-- DropForeignKey
ALTER TABLE `PDP` DROP FOREIGN KEY `PDP_meetingId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_meetingId_fkey`;

-- DropForeignKey
ALTER TABLE `Rubric` DROP FOREIGN KEY `Rubric_rubricsId_fkey`;

-- DropForeignKey
ALTER TABLE `TemplatePlan` DROP FOREIGN KEY `TemplatePlan_assignedId_fkey`;

-- DropForeignKey
ALTER TABLE `TemplatePlan` DROP FOREIGN KEY `TemplatePlan_editedById_fkey`;

-- DropForeignKey
ALTER TABLE `TemplatePlan` DROP FOREIGN KEY `TemplatePlan_obsSchedulingId_fkey`;

-- DropForeignKey
ALTER TABLE `TemplatePlanStep` DROP FOREIGN KEY `TemplatePlanStep_templatePlanId_fkey`;

-- DropForeignKey
ALTER TABLE `Uninformed` DROP FOREIGN KEY `Uninformed_meetingId_fkey`;

-- DropTable
DROP TABLE `CourseSlots`;

-- DropTable
DROP TABLE `Courses`;

-- DropTable
DROP TABLE `FeedBacks`;

-- DropTable
DROP TABLE `Informed`;

-- DropTable
DROP TABLE `Meetings`;

-- DropTable
DROP TABLE `Messages`;

-- DropTable
DROP TABLE `ObsReasons`;

-- DropTable
DROP TABLE `ObsScheduling`;

-- DropTable
DROP TABLE `Observations`;

-- DropTable
DROP TABLE `PDP`;

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `Rubric`;

-- DropTable
DROP TABLE `Rubrics`;

-- DropTable
DROP TABLE `TemplatePlan`;

-- DropTable
DROP TABLE `TemplatePlanStep`;

-- DropTable
DROP TABLE `Uninformed`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Example` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
