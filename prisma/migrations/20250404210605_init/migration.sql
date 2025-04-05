/*
  Warnings:

  - Added the required column `extraServices` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "extraServices" INTEGER NOT NULL;
