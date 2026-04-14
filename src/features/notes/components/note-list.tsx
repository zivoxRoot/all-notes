"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import {
  EllipsisVertical,
  OctagonAlert,
  Pin,
  PinOff,
  Plus,
  ScrollText,
  Trash2,
} from "lucide-react"
import {
  useNotes,
  usePinNote,
  useSoftDeleteNote,
  useUnpinNote,
} from "../hooks/notes.hook"
import { Note } from "../schemas/notes.schema"
import Link from "next/link"

const NoteList = () => {
  const { data: notes, isLoading, error } = useNotes()
  const deleteNoteMutation = useSoftDeleteNote()
  const pinNoteMutation = usePinNote()
  const unpinNoteMutation = useUnpinNote()

  const handleDeletion = (id: string) => {
    deleteNoteMutation.mutate(id)
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-2">
        <Skeleton className="flex h-4 flex-col gap-2 rounded-md bg-secondary p-14"></Skeleton>
        <Skeleton className="flex h-4 flex-col gap-2 rounded-md bg-secondary p-14"></Skeleton>
        <Skeleton className="flex h-4 flex-col gap-2 rounded-md bg-secondary p-14"></Skeleton>
        <Skeleton className="flex h-4 flex-col gap-2 rounded-md bg-secondary p-14"></Skeleton>
        <Skeleton className="flex h-4 flex-col gap-2 rounded-md bg-secondary p-14"></Skeleton>
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

  if (notes?.length == 0) {
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant={"icon"}>
            <ScrollText />
          </EmptyMedia>
          <EmptyTitle>No notes yet</EmptyTitle>
          <EmptyDescription>
            Create a note to see it appear here.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant={"outline"}>
            <Plus />
            New note
          </Button>
        </EmptyContent>
      </Empty>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {notes?.map((note: Note) => (
        <div
          key={note.id}
          className="flex flex-col gap-2 rounded-md bg-secondary p-4"
        >
          <div className="flex items-center justify-between gap-2">
            <Link href={`/${note.id}`} className="text-lg font-semibold">
              {note.title}
            </Link>
            {note.pinned && <Pin size={16} />}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"} size={"icon-xs"}>
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    note.pinned
                      ? unpinNoteMutation.mutate(note.id)
                      : pinNoteMutation.mutate(note.id)
                  }}
                >
                  {note.pinned ? (
                    <>
                      <PinOff />
                      Unpin
                    </>
                  ) : (
                    <>
                      <Pin />
                      Pin
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => handleDeletion(note.id)}
                >
                  <Trash2 /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  )
}

export default NoteList
