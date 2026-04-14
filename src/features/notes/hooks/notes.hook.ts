"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { NotesClient } from "../clients/notes.client"
import {
  softDeleteNoteAction,
  newNoteAction,
  hardDeleteNoteAction,
  restoreNoteAction,
  pinNoteAction,
  unpinNoteAction,
  updateNoteAction,
} from "../actions/notes.actions"

export const noteKeys = {
  all: ["notes"] as const,
  lists: () => ["notes", "list"] as const,
  list: (type: "active" | "trash") => [...noteKeys.lists(), type] as const,

  details: () => [...noteKeys.all, "detail"] as const,
  detail: (id: string) => [...noteKeys.details(), id] as const,
}

export function useNotes() {
  return useQuery({
    queryKey: noteKeys.list("active"),
    queryFn: NotesClient.getAllNonDeleted,
  })
}

export function useTrashedNotes() {
  return useQuery({
    queryKey: noteKeys.list("trash"),
    queryFn: NotesClient.getAllDeleted,
  })
}

export function useNote(id: string) {
  return useQuery({
    queryKey: noteKeys.detail(id),
    queryFn: () => NotesClient.getNoteById(id),
    enabled: !!id,
  })
}

export function useNewNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => {
      return newNoteAction()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() })
    },
  })
}

export function useUpdateNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      title,
      content,
    }: {
      id: string
      title: string
      content: string
    }) => updateNoteAction(id, title, content),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() })
      queryClient.invalidateQueries({ queryKey: noteKeys.detail(data.id) })
    },
  })
}

export function usePinNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => pinNoteAction(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() })
      queryClient.invalidateQueries({ queryKey: noteKeys.detail(id) })
    },
  })
}

export function useUnpinNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => unpinNoteAction(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() })
      queryClient.invalidateQueries({ queryKey: noteKeys.detail(id) })
    },
  })
}

export function useSoftDeleteNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => softDeleteNoteAction(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() })
      queryClient.invalidateQueries({ queryKey: noteKeys.detail(id) })
    },
  })
}

export function useRestoreNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => restoreNoteAction(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() })
      queryClient.invalidateQueries({ queryKey: noteKeys.detail(id) })
    },
  })
}

export function useHardDeleteNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => hardDeleteNoteAction(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: noteKeys.list("trash") })
      queryClient.invalidateQueries({ queryKey: noteKeys.detail(id) })
    },
  })
}
