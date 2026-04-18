import { tagSchema } from "@/features/tags/schemas/tags.schema"
import { z } from "zod"

export const noteSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  content: z.string(),
  pinned: z.boolean(),
  tags: z.array(tagSchema),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
})

export type Note = z.infer<typeof noteSchema>

export const noteListSchema = z.array(noteSchema)
