/*
  Warnings:

  - Added the required column `weekendSurcharge` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "weekendSurcharge" INTEGER NOT NULL;
