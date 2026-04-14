import { noteListSchema, noteSchema } from "../schemas/notes.schema"

export const NotesClient = {
  async getAllNonDeleted() {
    const response = await fetch("/api/notes")

    const data = await response.json()
    const parsed = noteListSchema.safeParse(data)

    if (!parsed.success) {
      throw new Error(`Invalid API response ${parsed.error}`)
    }

    return parsed.data
  },

  async getAllDeleted() {
    const response = await fetch("/api/notes/trash")

    const data = await response.json()
    const parsed = noteListSchema.safeParse(data)

    if (!parsed.success) {
      throw new Error(`Invalid API response ${parsed.error}`)
    }

    return parsed.data
  },

  async getNoteById(id: string) {
    const response = await fetch(`/api/notes/${id}`)

    const data = await response.json()
    const parsed = noteSchema.safeParse(data)

    if (!parsed.success) {
      throw new Error(`Invalid API response ${parsed.error}`)
    }

    return parsed.data
  },
}
