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
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import { EllipsisVertical, OctagonAlert, Trash2 } from "lucide-react"
import {
  useHardDeleteNote,
  useRestoreNote,
  useTrashedNotes,
} from "../hooks/notes.hook"
import { Note } from "../schemas/notes.schema"

const NoteTrashList = () => {
  const { data: notes, isLoading, error } = useTrashedNotes()
  const restoreMutation = useRestoreNote()
  const hardDeleteMutation = useHardDeleteNote()

  const handleRestore = (id: string) => {
    restoreMutation.mutate(id)
  }

  const handleHardDelete = (id: string) => {
    hardDeleteMutation.mutate(id)
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
            <Trash2 />
          </EmptyMedia>
          <EmptyTitle>Empty trash</EmptyTitle>
          <EmptyDescription>
            Notes you delete will appear here. You can restore them or delete
            them forever. They will automatically be deleted 30 days after you
            put them in trash.
          </EmptyDescription>
        </EmptyHeader>
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
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"} size={"icon-xs"}>
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => handleHardDelete(note.id)}
                >
                  <Trash2 /> Delete forever
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p>{note.content}</p>
          <Button onClick={() => handleRestore(note.id)}>Restore</Button>
        </div>
      ))}
    </div>
  )
}

export default NoteTrashList
