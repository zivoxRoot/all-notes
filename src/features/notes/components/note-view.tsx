"use client"

import { AutosizeTextarea } from "@/components/ui/autoresize-textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Home, OctagonAlert } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useNote, useUpdateNote } from "../hooks/notes.hook"

const NoteView = ({ id }: { id: string }) => {
  // Query
  const { data: note, error, isLoading } = useNote(id)

  // Mutations
  const updateNoteMutation = useUpdateNote()

  // States
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Set the note title and content in the input
  useEffect(() => {
    if (!note) return

    setTitle(note.title ?? "")
    setContent(note.content ?? "")
  }, [note])

  // Debounce the user modifications and mutate DB
  useEffect(() => {
    if (!id) return

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      handleUpdate()
    }, 500)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [title, content])

  // Mutate user modifications
  const handleUpdate = async () => {
    try {
      await updateNoteMutation.mutateAsync({ id, title, content })
    } catch (error) {
      console.error("Note update error:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-4 w-32" />
      </div>
    )
  }

  if (error) {
    return (
      <p className="text-destructive">
        <OctagonAlert />
        {error.message}
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <Button asChild className="w-fit">
          <Link href={"/"}>
            <Home />
            Home
          </Link>
        </Button>
        {/* <div className="flex items-center gap-2">
          <Button variant={"destructive"}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </div> */}
      </div>
      <Input
        className="text-2xl font-semibold"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <AutosizeTextarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  )
}

export default NoteView
