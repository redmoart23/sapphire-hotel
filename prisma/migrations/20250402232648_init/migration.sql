/*
  Warnings:

  - Added the required column `finalPrice` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasDiscount` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasExtraServices` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "finalPrice" INTEGER NOT NULL,
ADD COLUMN     "hasDiscount" BOOLEAN NOT NULL,
ADD COLUMN     "hasExtraServices" BOOLEAN NOT NULL;
