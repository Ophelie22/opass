/*
  Warnings:

  - You are about to drop the column `region_id` on the `Package` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Package" DROP CONSTRAINT "Package_region_id_fkey";

-- AlterTable
ALTER TABLE "Package" DROP COLUMN "region_id",
ADD COLUMN     "regionId" INTEGER;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;
