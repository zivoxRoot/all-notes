import { z } from "zod"

export const noteSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  content: z.string(),
  pinned: z.boolean(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
})

export type Note = z.infer<typeof noteSchema>

// export const newNoteSchema = z.object({
//   title: z.string().min(1),
//   content: z.string().optional(),
//   pinned: z.boolean().optional(),
// })

// export type NewNote = z.infer<typeof newNoteSchema>

const tagSchema = z.object({
  id: z.uuid(),
  name: z.string(),
})

export type Tag = z.infer<typeof tagSchema>

const tagNoteSchema = z.object({
  id: z.uuid(),
  noteId: z.uuid(),
  tagId: z.uuid(),
})

export type TagNote = z.infer<typeof tagNoteSchema>

export const noteListSchema = z.array(noteSchema)
