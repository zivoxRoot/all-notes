import { NoteRepository } from "../repositories/notes.repository"

export const NotesService = {
  async getAllNotesNonDeleted() {
    return NoteRepository.getAllNotesNonDeleted()
  },

  async getDeletedNotes() {
    return NoteRepository.getDeletedNotes()
  },

  async getNoteById(id: string) {
    return NoteRepository.getNoteById(id)
  },

  async pinNote(id: string) {
    return NoteRepository.pinNote(id)
  },

  async unpinNote(id: string) {
    return NoteRepository.unpinNote(id)
  },

  async newNote() {
    return NoteRepository.newNote()
  },

  async updateNote(id: string, title: string, content: string) {
    return NoteRepository.updateNote(id, title, content)
  },

  async softDeleteNote(id: string) {
    return NoteRepository.softDeleteNote(id)
  },

  async restoreNote(id: string) {
    return NoteRepository.restoreNote(id)
  },

  async hardDeleteNote(id: string) {
    return NoteRepository.hardDeleteNote(id)
  },

  async wipeTrash() {
    return NoteRepository.wipeTrash()
  },
}
