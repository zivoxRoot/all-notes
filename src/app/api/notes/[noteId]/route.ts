import { noteSchema } from "@/features/notes/schemas/notes.schema"
import { NotesService } from "@/features/notes/services/notes.service"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ noteId: string }> }
) {
  try {
    const { noteId } = await params
    const note = await NotesService.getNoteById(noteId)

    const parsed = noteSchema.safeParse(note)
    if (!parsed.success) {
      console.error(
        "GET /api/notes/[noteId] note schema complains error:",
        parsed.error
      )
      return NextResponse.json({ error: parsed.error }, { status: 500 })
    }

    return NextResponse.json(parsed.data)
  } catch (error) {
    console.error("GET /api/notes/[noteId] error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
