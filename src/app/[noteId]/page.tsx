"use client"

import NoteView from "@/features/notes/components/note-view"
import { useParams } from "next/navigation"

const Page = () => {
  const params = useParams<{ noteId: string }>()
  const id = params.noteId

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-200 flex-col gap-4 p-4">
        <NoteView id={id} />
      </div>
    </div>
  )
}

export default Page
