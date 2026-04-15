"use client"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AutosizeTextarea } from "@/components/ui/autoresize-textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { ArchiveRestore, OctagonAlert, Pin, PinOff, Trash2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import {
  useNote,
  usePinNote,
  useRestoreNote,
  useUnpinNote,
  useUpdateNote,
} from "../hooks/notes.hook"

const NoteView = ({ id }: { id: string }) => {
  // Query
  const { data: note, error, isLoading } = useNote(id)

  // Mutations
  const updateNoteMutation = useUpdateNote()
  const restoreMutation = useRestoreNote()
  const pinNoteMutation = usePinNote()
  const unpinNoteMutation = useUnpinNote()

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
  // TODO: Check if there was modifications ? Check good practice on debounce
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

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-4 w-32" />
      </div>
    )
  }

  // Error
  if (error) {
    return (
      <p className="text-destructive">
        <OctagonAlert />
        {error.message}
      </p>
    )
  }

  // Note content
  return (
    <>
      {note?.deletedAt != null && (
        <Alert variant={"destructive"}>
          <Trash2 />
          <AlertTitle>This note has been trashed</AlertTitle>
          <AlertDescription>
            It will be deleted forever in{" "}
            {Math.max(
              0,
              Math.ceil(
                (new Date(note.deletedAt).getTime() +
                  30 * 86400000 -
                  Date.now()) /
                  86400000
              )
            )}{" "}
            days
          </AlertDescription>
          <AlertAction>
            <Button onClick={() => restoreMutation.mutate(note.id)}>
              <ArchiveRestore />
              Restore
            </Button>
          </AlertAction>
        </Alert>
      )}
      <div className="flex w-full items-center gap-2">
        <Input
          className="border-none bg-none text-2xl! font-semibold focus-visible:border-none focus-visible:ring-0"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => {
            note?.pinned
              ? unpinNoteMutation.mutate(id)
              : pinNoteMutation.mutate(id)
          }}
        >
          {note?.pinned ? (
            <>
              <PinOff />
            </>
          ) : (
            <>
              <Pin />
            </>
          )}
        </Button>
      </div>
      <AutosizeTextarea
        autoFocus
        className="resize-none border-none bg-none focus-visible:ring-0"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </>
  )
}

export default NoteView
