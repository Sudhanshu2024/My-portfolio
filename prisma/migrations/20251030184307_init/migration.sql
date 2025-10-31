/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BlogTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_BlogTags" DROP CONSTRAINT "_BlogTags_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_BlogTags" DROP CONSTRAINT "_BlogTags_B_fkey";

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "public"."Tag";

-- DropTable
DROP TABLE "public"."_BlogTags";
