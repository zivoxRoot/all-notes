"use client"

import NoteView from "@/features/notes/components/note-view"
import { useParams } from "next/navigation"

const Page = () => {
  const params = useParams<{ noteId: string }>()
  const id = params.noteId

  return <NoteView id={id} />
}

export default Page
