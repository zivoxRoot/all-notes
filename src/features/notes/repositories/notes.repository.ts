import { prisma } from "@/lib/prisma"

export const NoteRepository = {
  getAllNotesNonDeleted: async () => {
    const notes = await prisma.note.findMany({
      where: { deletedAt: null },
      orderBy: [{ pinned: "desc" }, { updatedAt: "desc" }],
      include: { tagNotes: { include: { tag: true } } },
    })

    return notes.map((note) => ({
      ...note,
      tags: note.tagNotes.map((tn) => tn.tag),
    }))
  },

  getDeletedNotes: async () => {
    const notes = await prisma.note.findMany({
      where: { deletedAt: { not: null } },
      orderBy: { deletedAt: "desc" },
      include: { tagNotes: { include: { tag: true } } },
    })

    return notes.map((note) => ({
      ...note,
      tags: note.tagNotes.map((tn) => tn.tag),
    }))
  },

  getNoteById: async (id: string) => {
    const note = await prisma.note.findUnique({
      where: { id },
      include: { tagNotes: { include: { tag: true } } },
    })

    if (!note) return null

    return {
      ...note,
      tags: note.tagNotes.map((tn) => tn.tag),
    }
  },

  newNote: () => {
    return prisma.note.create({
      data: {
        title: "",
        content: "",
        pinned: false,
      },
    })
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

  wipeTrash: () =>
    prisma.note.deleteMany({ where: { deletedAt: { not: null } } }),
}
