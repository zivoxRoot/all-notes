"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Delete } from "lucide-react"
import { useState } from "react"
import { useWipeTrash } from "../hooks/notes.hook"

const NotesWipeTrash = () => {
  // Mutations
  const wipeTrashMutation = useWipeTrash()

  // State
  const [open, setOpen] = useState<boolean>(false)

  const handleWipeTrash = async () => {
    try {
      await wipeTrashMutation.mutateAsync()
      setOpen(false)
    } catch (error) {
      console.error("Error wiping the trash")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Delete />
          Wipe
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Are you sure wiping trash ?</DialogTitle>
        <DialogDescription>
          All notes in the trash will be deleted forever
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleWipeTrash} variant={"destructive"}>
            Wipe all
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NotesWipeTrash
