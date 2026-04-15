"use client"

import { Badge } from "@/components/ui/badge"
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
  ScrollText,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import {
  useNotes,
  usePinNote,
  useSoftDeleteNote,
  useUnpinNote,
} from "../hooks/notes.hook"
import { Note } from "../schemas/notes.schema"
import NewNote from "./new-note"

const NoteList = () => {
  const { data: notes, isLoading, error } = useNotes()
  const deleteNoteMutation = useSoftDeleteNote()
  const pinNoteMutation = usePinNote()
  const unpinNoteMutation = useUnpinNote()

  const handleDeletion = (id: string) => {
    deleteNoteMutation.mutate(id)
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5].map(() => (
          <Card>
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
            <ScrollText />
          </EmptyMedia>
          <EmptyTitle>No notes yet</EmptyTitle>
          <EmptyDescription>
            Create a note to see it appear here.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <NewNote sidebar={false} />
        </EmptyContent>
      </Empty>
    )
  }

  // Notes list
  return (
    <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 md:grid-cols-3 md:p-4 xl:grid-cols-4">
      {notes?.map((note: Note) => (
        <Link href={`/${note.id}`} key={note.id}>
          <Card className="h-full">
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
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
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
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeletion(note.id)
                      }}
                    >
                      <Trash2 /> Trash
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="truncate">{note.content}</p>
            </CardContent>
            {note.pinned && (
              <CardFooter>
                {note.pinned && (
                  <Badge variant={"secondary"}>
                    <Pin />
                  </Badge>
                )}
              </CardFooter>
            )}
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default NoteList
