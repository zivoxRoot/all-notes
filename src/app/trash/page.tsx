import NoteTrashList from "@/features/notes/components/note-trash-list"

export default function Page() {
  return (
    <>
      <h1 className="p-2 text-3xl font-semibold md:p-4">Trash</h1>
      <NoteTrashList />
    </>
  )
}
