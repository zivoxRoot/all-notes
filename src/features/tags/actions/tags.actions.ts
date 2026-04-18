"use server"

import { TagColor, TagIcon } from "generated/prisma/enums"
import { TagService } from "../services/tag.service"

type ActionResult<T = void> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: string
    }

export async function newTagAction(
  name: string,
  icon: TagIcon,
  color: TagColor
): Promise<ActionResult<{ id: string }>> {
  try {
    const tag = await TagService.create(name, icon, color)
    return { success: true, data: { id: tag.id } }
  } catch (error) {
    console.error("New tag error:", error)
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create new note",
    }
  }
}

export async function updateTagAction(
  id: string,
  name: string,
  icon: TagIcon,
  color: TagColor
): Promise<ActionResult<{ id: string }>> {
  try {
    const tag = await TagService.update(id, name, icon, color)
    return { success: true, data: { id: tag.id } }
  } catch (error) {
    console.error("Update tag error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Update tag error",
    }
  }
}

export async function deleteTagAction(
  tagId: string
): Promise<ActionResult<{ id: string }>> {
  try {
    const tag = await TagService.deleteTag(tagId)
    return { success: true, data: { id: tag.id } }
  } catch (error) {
    console.error("Delete tag error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Delete tag error",
    }
  }
}

export async function addTagToNoteAction(
  noteId: string,
  tagId: string
): Promise<ActionResult<{ id: string }>> {
  try {
    const note = await TagService.addTagToNote(noteId, tagId)
    return { success: true, data: { id: note.id } }
  } catch (error) {
    console.error("Add tag to note error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Add tag to note error",
    }
  }
}

export async function removeTagFromNoteAction(
  noteId: string,
  tagId: string
): Promise<ActionResult<{ id: string }>> {
  try {
    const note = await TagService.removeTagFromNote(noteId, tagId)
    return { success: true, data: { id: note.id } }
  } catch (error) {
    console.error("Remove tag from note error:", error)
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Remove tag from note error",
    }
  }
}
