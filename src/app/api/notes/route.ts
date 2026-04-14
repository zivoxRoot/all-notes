import { noteListSchema } from "@/features/notes/schemas/notes.schema"
import { NotesService } from "@/features/notes/services/notes.service"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
  try {
    const notes = await NotesService.getAllNotesNonDeleted()

    const parsed = noteListSchema.parse(notes)

    return NextResponse.json(parsed)
  } catch (error) {
    console.error("GET api/notes/route.ts error:", error)
    return NextResponse.json(error)
  }
}
