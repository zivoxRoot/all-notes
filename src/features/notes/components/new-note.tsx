"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useNewNote } from "../hooks/notes.hook"

const NewNote = () => {
  const router = useRouter()
  const createNoteMutation = useNewNote()

  const onClick = async () => {
    const result = await createNoteMutation.mutateAsync()
    if (!result.success) {
      console.error("Error updting note:", result.error)
      return
    }

    router.push(`/${result.data.id}`)
  }

  return (
    <Button onClick={onClick}>
      <Plus /> New
    </Button>
  )
}

export default NewNote
