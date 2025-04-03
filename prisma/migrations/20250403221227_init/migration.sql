/*
  Warnings:

  - You are about to drop the column `roomStatus` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "roomStatus",
ADD COLUMN     "status" "RoomStatus" NOT NULL DEFAULT 'AVAILABLE';
