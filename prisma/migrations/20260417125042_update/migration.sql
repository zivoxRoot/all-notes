/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TagNote" DROP CONSTRAINT "TagNote_noteId_fkey";

-- DropForeignKey
ALTER TABLE "TagNote" DROP CONSTRAINT "TagNote_tagId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "TagNote_noteId_idx" ON "TagNote"("noteId");

-- CreateIndex
CREATE INDEX "TagNote_tagId_idx" ON "TagNote"("tagId");

-- AddForeignKey
ALTER TABLE "TagNote" ADD CONSTRAINT "TagNote_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagNote" ADD CONSTRAINT "TagNote_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
