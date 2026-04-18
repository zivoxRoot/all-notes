"use client"

import { Button } from "@/components/ui/button"
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, Trash2 } from "lucide-react"
import { useDeleteTag, useTags } from "../hooks/tags.hooks"
import { TAG_FG_COLOR_STYLES } from "../lib/tags-colors"
import { TAG_ICONS_STYLES } from "../lib/tags-icons"
import { Tag } from "../schemas/tags.schema"
import UpdateTag from "./update-tag"

const TagsList = () => {
  // Queries
  const { data: tags, error, isLoading } = useTags()

  // Mutation
  const deleteTagMutation = useDeleteTag()

  const handleDeleteTag = async (tagId: string) => {
    try {
      await deleteTagMutation.mutateAsync(tagId)
    } catch (error) {
      console.error("Error deleting tag:", error)
    }
  }

  // Loading state
  if (isLoading) {
    return <div>Loading tags...</div>
  }

  // Error
  if (error) {
    return <div>{error.message}</div>
  }

  // Tags list
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {tags?.map((tag: Tag) => {
        const Icon = TAG_ICONS_STYLES[tag.icon]

        return (
          <UpdateTag tag={tag} key={tag.id}>
            <Card className="h-full hover:cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 truncate">
                  <Icon size={16} />
                  <span
                    className={`truncate ${TAG_FG_COLOR_STYLES[tag.color]}`}
                  >
                    {tag.name}
                  </span>
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
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteTag(tag.id)
                        }}
                      >
                        <Trash2 /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardAction>
              </CardHeader>
            </Card>
          </UpdateTag>
        )
      })}
    </div>
  )
}

export default TagsList
