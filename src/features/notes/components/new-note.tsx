"use client"

import { SidebarMenuButton } from "@/components/ui/sidebar"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useNewNote } from "../hooks/notes.hook"
import { Button } from "@/components/ui/button"

const NewNote = ({ sidebar }: { sidebar: boolean }) => {
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

  if (sidebar) {
    return (
      <SidebarMenuButton onClick={onClick} variant={"outline"}>
        <Plus /> New
      </SidebarMenuButton>
    )
  }

  return (
    <Button onClick={onClick} variant={"outline"}>
      <Plus /> New
    </Button>
  )
}

export default NewNote
