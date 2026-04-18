"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRight, Tags } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTags } from "../hooks/tags.hooks"
import { TAG_FG_COLOR_STYLES } from "../lib/tags-colors"
import { TAG_ICONS_STYLES } from "../lib/tags-icons"
import { Tag } from "../schemas/tags.schema"
import UpdateTag from "./update-tag"

const TagsSidebarList = () => {
  // Queries
  const { data: tags, error, isLoading } = useTags()

  // Data
  const path = usePathname()

  // Loading state
  if (isLoading) {
    return (
      <Collapsible asChild defaultOpen>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={"/tags"}>
              <Tags />
              Tags
            </Link>
          </SidebarMenuButton>
          <CollapsibleTrigger asChild>
            <SidebarMenuAction className="data-[state=open]:rotate-90">
              <ChevronRight />
              <span className="sr-only">Toggle</span>
            </SidebarMenuAction>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {Array.from({ length: 5 })?.map((_, index) => (
                <SidebarMenuSubItem key={index}>
                  <SidebarMenuSkeleton />
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  // Error
  if (error) {
    return (
      <Collapsible asChild defaultOpen>
        <SidebarMenuItem className="text-destructive">
          <SidebarMenuButton>Error getting tags</SidebarMenuButton>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  // Tags list
  return (
    <>
      <Collapsible asChild defaultOpen>
        <SidebarMenuItem>
          <SidebarMenuButton asChild isActive={path == "/tags"}>
            <Link href={"/tags"}>
              <Tags />
              Tags
            </Link>
          </SidebarMenuButton>
          <CollapsibleTrigger asChild>
            <SidebarMenuAction className="data-[state=open]:rotate-90">
              <ChevronRight />
              <span className="sr-only">Toggle</span>
            </SidebarMenuAction>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {tags?.map((tag: Tag) => {
                const Icon = TAG_ICONS_STYLES[tag.icon]

                return (
                  <UpdateTag tag={tag} key={tag.id}>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        className={`${TAG_FG_COLOR_STYLES[tag.color]}`}
                      >
                        <Icon />
                        {tag.name}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </UpdateTag>
                )
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </>
  )
}

export default TagsSidebarList
