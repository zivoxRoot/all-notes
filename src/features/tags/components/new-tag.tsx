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
import { Plus } from "lucide-react"
import { useState } from "react"
import { useCreateTag } from "../hooks/tags.hooks"
import TagColorSelector from "./tag-color-selector"
import TagIconSelector from "./tag-icon-selector"

const NewTag = () => {
  // Mutations
  const createTagMutation = useCreateTag()

  // State
  const [name, setName] = useState<string>("")
  const [icon, setIcon] = useState<TagIcon>(TagIcon.STAR)
  const [color, setColor] = useState<TagColor>(TagColor.GREEN)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  const handleSubmit = async () => {
    const result = await createTagMutation.mutateAsync({
      name,
      icon,
      color,
    })

    setName("")
    setIcon(TagIcon.STAR)
    setColor(TagColor.GREEN)
    setDialogOpen(false)

    if (!result.success) {
      console.error("Error creating tag:", result.error)
      return
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Plus />
          New tag
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create a new tag</DialogTitle>
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
              <Button type="submit" onClick={handleSubmit}>
                Create
              </Button>
            </FieldSet>
          </Field>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NewTag
