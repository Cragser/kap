/*
  Warnings:

  - You are about to drop the column `text` on the `highlight` table. All the data in the column will be lost.
  - Added the required column `content` to the `Highlight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `highlight` DROP COLUMN `text`,
    ADD COLUMN `content` VARCHAR(191) NOT NULL,
    ADD COLUMN `groupID` VARCHAR(191) NULL;
