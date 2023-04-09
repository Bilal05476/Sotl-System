/*
  Warnings:

  - You are about to drop the `courses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `feedbacks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `film` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `informed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `informedrubrics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `meetings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `observations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `obsrequests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pdp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `person` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `uninformed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `film` DROP FOREIGN KEY `Film_directorId_fkey`;

-- DropForeignKey
ALTER TABLE `film` DROP FOREIGN KEY `Film_producerId_fkey`;

-- DropTable
DROP TABLE `courses`;

-- DropTable
DROP TABLE `feedbacks`;

-- DropTable
DROP TABLE `film`;

-- DropTable
DROP TABLE `informed`;

-- DropTable
DROP TABLE `informedrubrics`;

-- DropTable
DROP TABLE `meetings`;

-- DropTable
DROP TABLE `messages`;

-- DropTable
DROP TABLE `observations`;

-- DropTable
DROP TABLE `obsrequests`;

-- DropTable
DROP TABLE `pdp`;

-- DropTable
DROP TABLE `person`;

-- DropTable
DROP TABLE `post`;

-- DropTable
DROP TABLE `uninformed`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Delete` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
