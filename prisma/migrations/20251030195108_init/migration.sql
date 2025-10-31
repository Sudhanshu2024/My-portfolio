-- CreateEnum
CREATE TYPE "DisplayLocation" AS ENUM ('HOME_AND_BLOG', 'BLOG_ONLY');

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "displayLocation" "DisplayLocation" NOT NULL DEFAULT 'BLOG_ONLY',
ADD COLUMN     "thumbnail" TEXT;
