-- CreateEnum
CREATE TYPE "TagColor" AS ENUM ('RED', 'GREEN', 'BLUE', 'BLACK', 'YELLOW', 'PURPLE', 'ORANGE', 'GRAY');

-- CreateEnum
CREATE TYPE "TagIcon" AS ENUM ('STAR', 'HEART', 'BOOK', 'CODE', 'CLOCK', 'FLAG');

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "color" "TagColor" NOT NULL DEFAULT 'GREEN',
ADD COLUMN     "icon" "TagIcon" NOT NULL DEFAULT 'STAR';
