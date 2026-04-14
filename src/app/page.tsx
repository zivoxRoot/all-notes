import ThemeToggle from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import NewNote from "@/features/notes/components/new-note"
import NoteList from "@/features/notes/components/note-list"
import { Trash2 } from "lucide-react"
import Link from "next/link"

export default function Page() {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-200 flex-col gap-4 p-4">
        {/* Top row */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href={"/trash"}>
                <Trash2 />
                Trash
              </Link>
            </Button>
            <NewNote />
          </div>
          <ThemeToggle />
        </div>

        {/* Notes list */}
        <div className="bg-bleu-400 w-full">
          <NoteList />
        </div>
      </div>
    </div>
  )
}
