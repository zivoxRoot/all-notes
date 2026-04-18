import NoteTrashList from "@/features/notes/components/note-trash-list"
import NotesWipeTrash from "@/features/notes/components/notes-wipe-trash"

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="p-2 text-3xl font-semibold md:p-4">Trash</h1>
        <NotesWipeTrash />
      </div>
      <NoteTrashList />
    </>
  )
}
