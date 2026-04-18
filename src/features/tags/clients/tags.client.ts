import { noteListSchema } from "@/features/notes/schemas/notes.schema"
import { tagListSchema, tagSchema } from "../schemas/tags.schema"

export const tagsClient = {
  async getAllTags() {
    const response = await fetch("/api/tags")

    const data = await response.json()
    const parsed = tagListSchema.safeParse(data)

    if (!parsed.success) {
      throw new Error("Invalid API response ", parsed.error)
    }

    return parsed.data
  },

  async getTagById(tagId: string) {
    const response = await fetch(`/api/tags/${tagId}`)

    const data = await response.json()

    const parsed = tagSchema.safeParse(data)

    if (!parsed.success) {
      throw new Error("Invalid API response ", parsed.error)
    }

    return parsed.data
  },

  async getNotesWithTagId(tagId: string) {
    const response = await fetch(`/api/tags/${tagId}/notes`)

    const data = await response.json()

    const parsed = noteListSchema.safeParse(data)

    if (!parsed.success) {
      throw new Error("Invalid API response ", parsed.error)
    }

    return parsed.data
  },
}
