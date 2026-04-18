"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { TagColor, TagIcon } from "generated/prisma/enums"
import { useState } from "react"
import { useUpdateTag } from "../hooks/tags.hooks"
import { Tag } from "../schemas/tags.schema"
import TagColorSelector from "./tag-color-selector"
import TagIconSelector from "./tag-icon-selector"

const UpdateTag = ({
  tag,
  children,
}: {
  tag: Tag
  children: React.ReactNode
}) => {
  // Mutations
  const updateTagMutation = useUpdateTag()

  // State
  const [name, setName] = useState<string>(tag.name)
  const [icon, setIcon] = useState<TagIcon>(tag.icon)
  const [color, setColor] = useState<TagColor>(tag.color)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  const handleUpdateTag = async () => {
    try {
      await updateTagMutation.mutateAsync({ id: tag.id, name, icon, color })

      setName("")
      setIcon(TagIcon.STAR)
      setColor(TagColor.GREEN)
      setDialogOpen(false)
    } catch (error) {
      console.error("Error updating tag:", error)
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Update tag</DialogTitle>
        <form onSubmit={(e) => e.preventDefault()}>
          <Field>
            <FieldSet>
              <Field orientation={"horizontal"}>
                <Input
                  autoFocus
                  placeholder="Tag name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TagIconSelector value={icon} onChange={setIcon} />
                <TagColorSelector value={color} onChange={setColor} />
              </Field>
            </FieldSet>
            <FieldSet>
              <Button type="submit" onClick={handleUpdateTag}>
                Update
              </Button>
            </FieldSet>
          </Field>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateTag
