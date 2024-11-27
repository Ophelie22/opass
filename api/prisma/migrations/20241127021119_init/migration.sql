/*
  Warnings:

  - You are about to drop the column `site_id` on the `SiteUser` table. All the data in the column will be lost.
  - Added the required column `siteId` to the `SiteUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SiteUser" DROP CONSTRAINT "SiteUser_site_id_fkey";

-- AlterTable
ALTER TABLE "SiteUser" DROP COLUMN "site_id",
ADD COLUMN     "siteId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SiteUser" ADD CONSTRAINT "SiteUser_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
