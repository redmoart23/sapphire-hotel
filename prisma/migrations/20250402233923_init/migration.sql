/*
  Warnings:

  - Added the required column `guests` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "guests" INTEGER NOT NULL;
