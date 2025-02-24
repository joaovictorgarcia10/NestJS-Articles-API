/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Users` DROP COLUMN `isDeleted`,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT false;
