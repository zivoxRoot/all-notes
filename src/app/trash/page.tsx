import { Button } from "@/components/ui/button"
import NoteTrashList from "@/features/notes/components/note-trash-list"
import { Home } from "lucide-react"
import Link from "next/link"

export default function Page() {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-200 flex-col gap-4 p-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-semibold">Trash</h1>
          <Button asChild>
            <Link href={"/"}>
              <Home />
              Home
            </Link>
          </Button>
        </div>
        {/* Deleted notes list */}
        <div className="bg-bleu-400 w-full">
          <NoteTrashList />
        </div>
      </div>
    </div>
  )
}
