import { prisma } from "@/lib/prisma"
// import { NewNote } from "../schemas/notes.schema"

export const NoteRepository = {
  getAllNotesNonDeleted: () =>
    prisma.note.findMany({
      where: { deletedAt: null },
      orderBy: [{ pinned: "desc" }, { updatedAt: "desc" }],
    }),

  getDeletedNotes: () =>
    prisma.note.findMany({ where: { deletedAt: { not: null } } }),

  getNoteById: (id: string) => prisma.note.findUnique({ where: { id } }),

  newNote: () => {
    return prisma.note.create({
      data: {
        title: "",
        content: "",
        pinned: false,
      },
    })
    // return prisma.note.create({
    //   data: {
    //     title: note.title,
    //     content: note.content ?? "",
    //     pinned: note.pinned ?? false,
    //   },
    // })
  },

  updateNote: (id: string, title: string, content: string) =>
    prisma.note.update({ where: { id }, data: { title, content } }),

  pinNote: (id: string) => {
    return prisma.note.update({ where: { id }, data: { pinned: true } })
  },

  unpinNote: (id: string) => {
    return prisma.note.update({ where: { id }, data: { pinned: false } })
  },

  softDeleteNote: (id: string) =>
    prisma.note.update({
      where: { id },
      data: { deletedAt: new Date(), pinned: false },
    }),

  restoreNote: (id: string) =>
    prisma.note.update({ where: { id }, data: { deletedAt: null } }),

  hardDeleteNote: (id: string) => prisma.note.delete({ where: { id } }),
}
