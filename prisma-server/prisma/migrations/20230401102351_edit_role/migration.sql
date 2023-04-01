/*
  Warnings:

  - The values [Hod] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - The values [Gulshan,North,Airport,Bahria,Islamabad] on the enum `User_campus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('Admin', 'Campus_Director', 'Head_of_Department', 'Faculty', 'Observer') NOT NULL,
    MODIFY `campus` ENUM('Main_Campus', 'Gulshan_Campus', 'North_Campus', 'Airport_Campus', 'Bahria_Campus', 'Islamabad_Campus') NOT NULL;
