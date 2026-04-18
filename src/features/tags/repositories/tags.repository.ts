import { prisma } from "@/lib/prisma"
import { TagColor, TagIcon } from "generated/prisma/enums"

export const TagRepository = {
  getAllTags: () => prisma.tag.findMany(),

  create: (name: string, icon: TagIcon, color: TagColor) =>
    prisma.tag.create({ data: { name, icon, color } }),

  update: (id: string, name: string, icon: TagIcon, color: TagColor) =>
    prisma.tag.update({ where: { id }, data: { name, icon, color } }),

  deleteTag: (tagId: string) => prisma.tag.delete({ where: { id: tagId } }),

  getTagById: (tagId: string) =>
    prisma.tag.findUnique({
      where: { id: tagId },
    }),

  addTagToNote: (noteId: string, tagId: string) =>
    prisma.tagNote.create({ data: { noteId: noteId, tagId: tagId } }),

  removeTagFromNote: (noteId: string, tagId: string) =>
    prisma.tagNote.delete({ where: { noteId_tagId: { noteId, tagId } } }),
}
