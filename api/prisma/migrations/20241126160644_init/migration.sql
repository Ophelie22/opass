/*
  Warnings:

  - Added the required column `regionId` to the `SiteCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SiteCategory" ADD COLUMN     "regionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SiteCategory" ADD CONSTRAINT "SiteCategory_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
