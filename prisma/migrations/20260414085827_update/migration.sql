/*
  Warnings:

  - A unique constraint covering the columns `[noteId,tagId]` on the table `TagNote` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "pinned" SET DEFAULT false,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "deletedAt" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TagNote_noteId_tagId_key" ON "TagNote"("noteId", "tagId");
