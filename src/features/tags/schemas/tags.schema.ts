import { z } from "zod"

export const tagSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  color: z.enum(["RED", "GREEN", "BLUE", "YELLOW", "PURPLE", "ORANGE", "GRAY"]),
  icon: z.enum(["TAG", "STAR", "HEART", "BOOK", "CODE", "CLOCK", "FLAG"]),
})

export type Tag = z.infer<typeof tagSchema>

export const tagListSchema = z.array(tagSchema)
