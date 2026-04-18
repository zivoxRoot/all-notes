"use client"

import { noteKeys } from "@/features/notes/hooks/notes.hook"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TagColor, TagIcon } from "generated/prisma/enums"
import {
  addTagToNoteAction,
  deleteTagAction,
  newTagAction,
  removeTagFromNoteAction,
  updateTagAction,
} from "../actions/tags.actions"
import { tagsClient } from "../clients/tags.client"

export const tagsKeys = {
  all: ["tags"] as const,

  lists: () => ["tags", "list"] as const,
  list: (type: "all") => [...tagsKeys.lists(), type] as const,

  details: () => ["tags", "detail"] as const,
  detail: (id: string) => [...tagsKeys.details(), id] as const,
}

export function useTags() {
  return useQuery({
    queryKey: tagsKeys.all,
    queryFn: tagsClient.getAllTags,
  })
}

export function useCreateTag() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      name,
      icon,
      color,
    }: {
      name: string
      icon: TagIcon
      color: TagColor
    }) => newTagAction(name, icon, color),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagsKeys.all })
    },
  })
}

export function useUpdateTag() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      name,
      icon,
      color,
    }: {
      id: string
      name: string
      icon: TagIcon
      color: TagColor
    }) => updateTagAction(id, name, icon, color),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagsKeys.all })
    },
  })
}

export function useDeleteTag() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (tagId: string) => deleteTagAction(tagId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagsKeys.all })
    },
  })
}

export function useTag(id: string) {
  return useQuery({
    queryKey: tagsKeys.detail(id),
    queryFn: () => tagsClient.getTagById(id),
  })
}

export function useAddTagToNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ noteId, tagId }: { noteId: string; tagId: string }) =>
      addTagToNoteAction(noteId, tagId),
    onSuccess: (_, { noteId }) => {
      // Invalidate note list
      ;(queryClient.invalidateQueries({ queryKey: noteKeys.all }),
        // Invalidate the specific note
        queryClient.invalidateQueries({ queryKey: noteKeys.detail(noteId) }))
    },
  })
}

export function useRemoveTagFromNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ noteId, tagId }: { noteId: string; tagId: string }) =>
      removeTagFromNoteAction(noteId, tagId),
    onSuccess: (_, { noteId }) => {
      // Invalidate note list
      ;(queryClient.invalidateQueries({ queryKey: noteKeys.all }),
        // Invalidate the specific note
        queryClient.invalidateQueries({ queryKey: noteKeys.detail(noteId) }))
    },
  })
}
