"use server"

import { NotesService } from "../services/notes.service"

type ActionResult<T = void> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: string
    }

export async function newNoteAction(): Promise<ActionResult<{ id: string }>> {
  try {
    const note = await NotesService.newNote()
    return { success: true, data: { id: note.id } }
  } catch (error) {
    console.error("New note error:", error)
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create new note",
    }
  }
}

export async function updateNoteAction(
  id: string,
  title: string,
  content: string
): Promise<ActionResult<{ id: string }>> {
  try {
    await NotesService.updateNote(id, title, content)

    return { success: true, data: { id: id } }
  } catch (error) {
    console.error("Update note error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update note",
    }
  }
}

export async function pinNoteAction(
  id: string
): Promise<ActionResult<{ id: string }>> {
  try {
    await NotesService.pinNote(id)
    return { success: true, data: { id } }
  } catch (error) {
    console.error("Pin note error", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to pin note",
    }
  }
}

export async function unpinNoteAction(
  id: string
): Promise<ActionResult<{ id: string }>> {
  try {
    await NotesService.unpinNote(id)
    return { success: true, data: { id } }
  } catch (error) {
    console.error("Unpin note error", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to unpin note",
    }
  }
}

export async function softDeleteNoteAction(
  id: string
): Promise<ActionResult<{ id: string }>> {
  try {
    await NotesService.softDeleteNote(id)
    return { success: true, data: { id } }
  } catch (error) {
    console.error("Soft delete note error:", error)
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to soft delete a note",
    }
  }
}

export async function restoreNoteAction(
  id: string
): Promise<ActionResult<{ id: string }>> {
  try {
    await NotesService.restoreNote(id)
    return { success: true, data: { id } }
  } catch (error) {
    console.error("Restore note error:", error)
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to restore a note",
    }
  }
}

export async function hardDeleteNoteAction(
  id: string
): Promise<ActionResult<{ id: string }>> {
  try {
    await NotesService.hardDeleteNote(id)
    return { success: true, data: { id } }
  } catch (error) {
    console.error("Hard delete note error:", error)
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to hard delete a note",
    }
  }
}

export async function wipeTrashAction(): Promise<ActionResult<{}>> {
  try {
    await NotesService.wipeTrash()
    return { success: true, data: {} }
  } catch (error) {
    console.error("Wipe trash error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Wipe trash error",
    }
  }
}
