"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import {
  ArchiveRestore,
  EllipsisVertical,
  OctagonAlert,
  Trash2,
} from "lucide-react"
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

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <Card key={item}>
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
              <CardAction>
                <Button variant={"outline"} size={"icon-xs"}>
                  <EllipsisVertical />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
            </CardContent>
            <CardFooter />
          </Card>
        ))}
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

  // Empty state
  if (notes?.length == 0) {
    return (
      <Empty className="max-h-50 border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant={"icon"}>
            <Trash2 />
          </EmptyMedia>
          <EmptyTitle>Empty trash</EmptyTitle>
          <EmptyDescription>
            Notes you trash will appear here. You can restore them or delete
            them forever. They will automatically be deleted 30 days after you
            trashed them.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  // Trashed notes list
  return (
    <>
      <Alert variant={"destructive"} className="mx-2 md:mx-4">
        <Trash2 />
        <AlertTitle>Here are your trashed notes</AlertTitle>
        <AlertDescription>
          Notes you trash will appear here. You can restore them or delete them
          forever. They will automatically be deleted 30 days after you trashed
          them.
        </AlertDescription>
      </Alert>
      <div className="mx-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mx-4 md:grid-cols-3 xl:grid-cols-4">
        {notes?.map((note: Note) => (
          <Card className="h-full" key={note.id}>
            <CardHeader>
              <CardTitle className="truncate">
                {note.title.trim() == "" ? "Untitled" : note.title}
              </CardTitle>
              <CardAction>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"outline"} size={"icon-xs"}>
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-full">
                    <DropdownMenuItem onClick={() => handleRestore(note.id)}>
                      <ArchiveRestore />
                      Restore
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => handleHardDelete(note.id)}
                    >
                      <Trash2 /> Delete forever
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="truncate">{note.content}</p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <span>
                Deleted in{" "}
                {Math.max(
                  0,
                  Math.ceil(
                    (new Date(note.deletedAt || "").getTime() +
                      30 * 86400000 -
                      Date.now()) /
                      86400000
                  )
                )}{" "}
                days
              </span>
              <Button
                variant={"outline"}
                size={"sm"}
                className="w-full"
                onClick={() => handleRestore(note.id)}
              >
                <ArchiveRestore />
                Restore
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}

export default NoteTrashList
