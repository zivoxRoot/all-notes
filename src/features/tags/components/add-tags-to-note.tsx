"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Note } from "@/features/notes/schemas/notes.schema"
import { Plus } from "lucide-react"
import { useAddTagToNote, useTags } from "../hooks/tags.hooks"
import { TAG_FG_COLOR_STYLES } from "../lib/tags-colors"
import { TAG_ICONS_STYLES } from "../lib/tags-icons"
import { Tag } from "../schemas/tags.schema"

const AddTagsToNote = ({ note }: { note: Note }) => {
  const { data: tags, isLoading, error } = useTags()
  const addTagToNoteMutation = useAddTagToNote()

  const handleAddTag = async (tagId: string) => {
    const result = await addTagToNoteMutation.mutateAsync({
      noteId: note.id,
      tagId,
    })

    if (!result.success) {
      console.error("Error adding tag to note:", result.error)
      return
    }
  }

  // Error
  if (error) {
    return <Button className="text-destructive">Error</Button>
  }

  // Tag selector
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={isLoading} variant={"outline"}>
          <Plus />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {tags?.map((tag: Tag) => {
          const Icon = TAG_ICONS_STYLES[tag.icon]

          return (
            <DropdownMenuItem
              key={tag.id}
              onClick={() => handleAddTag(tag.id)}
              className={`${TAG_FG_COLOR_STYLES[tag.color]}`}
            >
              <Icon />
              {tag.name}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AddTagsToNote
