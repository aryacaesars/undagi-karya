/*
  Warnings:

  - You are about to drop the column `category` on the `supply_items` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `supply_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."supply_items" DROP COLUMN "category",
DROP COLUMN "unit";
