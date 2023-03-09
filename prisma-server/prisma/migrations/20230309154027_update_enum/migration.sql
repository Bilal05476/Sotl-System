/*
  Warnings:

  - The values [ADMIN,CAMPUSDIRECTOR,HOD,FACULTY,OBSERVER] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - The values [MAINCAMPUS,GULSHAN,NORTH,AIRPORT,BAHRIA,ISLAMABAD] on the enum `User_campus` will be removed. If these variants are still used in the database, this will fail.
  - The values [FEST,AIFD,MEDIA,BUSINESS] on the enum `User_department` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('Admin', 'Campus_Director', 'Hod', 'Faculty', 'Observer') NOT NULL,
    MODIFY `campus` ENUM('Main_Campus', 'Gulshan', 'North', 'Airport', 'Bahria', 'Islamabad') NOT NULL,
    MODIFY `department` ENUM('Fest', 'Aifd', 'Media', 'Business') NOT NULL;
