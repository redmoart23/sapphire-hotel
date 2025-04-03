/*
  Warnings:

  - You are about to drop the column `finalPrice` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `basePrice` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "finalPrice",
ADD COLUMN     "basePrice" INTEGER NOT NULL,
ADD COLUMN     "totalPrice" INTEGER NOT NULL;
