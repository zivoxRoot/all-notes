import { TagColor, TagIcon } from "generated/prisma/enums"
import { TagRepository } from "../repositories/tags.repository"

export const TagService = {
  getAllTags: () => TagRepository.getAllTags(),

  create: (name: string, icon: TagIcon, color: TagColor) =>
    TagRepository.create(name, icon, color),

  update: (id: string, name: string, icon: TagIcon, color: TagColor) =>
    TagRepository.update(id, name, icon, color),

  deleteTag: (tagId: string) => TagRepository.deleteTag(tagId),

  getTagById: (tagId: string) => TagRepository.getTagById(tagId),

  addTagToNote: (noteId: string, tagId: string) =>
    TagRepository.addTagToNote(noteId, tagId),

  removeTagFromNote: (noteId: string, tagId: string) =>
    TagRepository.removeTagFromNote(noteId, tagId),
}
